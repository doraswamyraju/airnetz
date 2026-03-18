import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// Auth Route (Login)
app.post('/api/auth/login', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ? AND password = ? AND role = ?',
      [email, password, role]
    );
    
    if (rows.length > 0) {
      const user = rows[0];
      // In a real app, we would return a JWT here
      res.json({ 
        success: true, 
        user: { id: user.id, name: user.name, email: user.email, role: user.role } 
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// --- CUSTOMER ENDPOINTS ---

// Get active plan and profile for a customer
app.get('/api/customer/profile/:userId', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.*, p.name as plan_name, p.speed_mbps, p.price_1m, u.name, u.email 
      FROM customers c
      JOIN users u ON c.user_id = u.id
      LEFT JOIN plans p ON c.plan_id = p.id
      WHERE c.user_id = ?
    `, [req.params.userId]);
    
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get service requests for a customer
app.get('/api/customer/requests/:customerId', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM service_requests WHERE customer_id = ?', [req.params.customerId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new service request
app.post('/api/customer/requests', async (req, res) => {
  const { customer_id, type, description, address, phone } = req.body;
  const requestId = `SR-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
  try {
    await pool.query(
      'INSERT INTO service_requests (id, customer_id, type, description, address, phone, requested_date) VALUES (?, ?, ?, ?, ?, ?, CURDATE())',
      [requestId, customer_id, type, description, address, phone]
    );
    res.json({ success: true, requestId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get payment history for a customer
app.get('/api/customer/payments/:customerId', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM payments WHERE customer_id = ? ORDER BY payment_date DESC', [req.params.customerId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- ADMIN ENDPOINTS ---

// Get all service requests with customer names
app.get('/api/admin/requests', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT sr.*, u.name as customer_name, a.name as agent_name
      FROM service_requests sr
      JOIN customers c ON sr.customer_id = c.id
      JOIN users u ON c.user_id = u.id
      LEFT JOIN users a ON sr.agent_id = a.id
      ORDER BY sr.requested_date DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Migration Endpoint
app.get('/api/admin/migrate', async (req, res) => {
  try {
    await pool.query('ALTER TABLE users ADD COLUMN phone VARCHAR(20) NULL');
    await pool.query('ALTER TABLE users ADD COLUMN location VARCHAR(255) NULL');
    await pool.query('ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT TRUE');
    await pool.query('ALTER TABLE payments ADD COLUMN agent_id INT NULL');
    await pool.query('ALTER TABLE payments ADD COLUMN commission_amount DECIMAL(10, 2) DEFAULT 0.00');
    res.json({ message: 'Migration successful' });
  } catch (error) {
    res.json({ message: 'Migration skipped or failed', error: error.message });
  }
});

// Admin Payments Endpoint
app.get('/api/admin/payments', async (req, res) => {
  try {
    const [payments] = await pool.query(`
      SELECT p.id, p.amount, DATE_FORMAT(p.payment_date, '%d %b %Y') as date, 
             p.status, p.commission_amount,
             c.user_id, u_cust.name as customer_name,
             u_agent.name as agent_name
      FROM payments p
      LEFT JOIN customers c ON p.customer_id = c.id
      LEFT JOIN users u_cust ON c.user_id = u_cust.id
      LEFT JOIN users u_agent ON p.agent_id = u_agent.id
      ORDER BY p.id DESC
    `);

    // Calculate aggregated stats
    const totalRevenue = payments.reduce((sum, p) => p.status === 'success' ? sum + Number(p.amount) : sum, 0);
    const pendingAmount = payments.reduce((sum, p) => p.status === 'pending' ? sum + Number(p.amount) : sum, 0);
    const totalCommissions = payments.reduce((sum, p) => p.status === 'success' ? sum + Number(p.commission_amount) : sum, 0);

    const data = {
      transactions: payments.map(p => ({
        id: `PAY-${p.id + 1000}`,
        date: p.date,
        customer: p.customer_name || 'Unknown',
        amount: `₹${Number(p.amount).toLocaleString()}`,
        agent: p.agent_name || 'Direct / System',
        commission: `₹${Number(p.commission_amount).toLocaleString()}`,
        status: p.status === 'success' ? 'Completed' : 'Pending'
      })),
      stats: {
        totalRevenue: `₹${totalRevenue.toLocaleString()}`,
        pendingAmount: `₹${pendingAmount.toLocaleString()}`,
        totalCommissions: `₹${totalCommissions.toLocaleString()}`
      }
    };
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get list of agents
app.get('/api/admin/agents', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, phone, location, is_active FROM users WHERE role = "agent"');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new agent
app.post('/api/admin/agents', async (req, res) => {
  const { name, email, phone, location } = req.body;
  try {
    const defaultPassword = 'agent' + Math.floor(100 + Math.random() * 900);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role, phone, location, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, defaultPassword, 'agent', phone, location, true]
    );

    // Send Welcome Email
    const mailOptions = {
      from: `"Airnetz Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Airnetz Agent Portal - Your Account Details',
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto;">
          <h2 style="color: #f97316;">Welcome to the Airnetz Team!</h2>
          <p>Hello ${name},</p>
          <p>An agent account has been created for you. You can now login to the Agent Portal.</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold;">Your Login Credentials:</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${defaultPassword}</p>
          </div>
          <p>Please log in at: <a href="http://airnetz.sriddha.com/login" style="color: #f97316;">airnetz.sriddha.com/login</a></p>
        </div>
      `
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (e) {
      console.error('Agent email failed:', e);
    }

    res.json({ success: true, id: result.insertId, name, email, phone, location, defaultPassword });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Toggle Agent Status
app.put('/api/admin/agents/:id/status', async (req, res) => {
  const { is_active } = req.body;
  try {
    await pool.query('UPDATE users SET is_active = ? WHERE id = ? AND role = "agent"', [is_active, req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Resend Agent Password
app.post('/api/admin/agents/:id/resend-password', async (req, res) => {
  try {
    const [users] = await pool.query('SELECT name, email FROM users WHERE id = ? AND role = "agent"', [req.params.id]);
    if (users.length === 0) return res.status(404).json({ message: 'Agent not found' });
    
    const agent = users[0];
    const newPassword = 'agent' + Math.floor(100 + Math.random() * 900);
    
    await pool.query('UPDATE users SET password = ? WHERE id = ?', [newPassword, req.params.id]);

    const mailOptions = {
      from: `"Airnetz Support" <${process.env.EMAIL_USER}>`,
      to: agent.email,
      subject: 'Airnetz Agent Portal - Password Reset',
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto;">
          <h2 style="color: #f97316;">Password Reset Request</h2>
          <p>Hello ${agent.name},</p>
          <p>Your password for the Airnetz Agent Portal has been reset by an administrator.</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold;">Your New Login Credentials:</p>
            <p><strong>Email:</strong> ${agent.email}</p>
            <p><strong>New Password:</strong> ${newPassword}</p>
          </div>
          <p>Please log in at: <a href="http://airnetz.sriddha.com/login" style="color: #f97316;">airnetz.sriddha.com/login</a></p>
        </div>
      `
    };
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Password reset and email sent successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Agent
app.delete('/api/admin/agents/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id = ? AND role = "agent"', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get live agent tracking data
app.get('/api/admin/agents/live', async (req, res) => {
  try {
    const [agents] = await pool.query(`
      SELECT u.id, u.name, u.phone, u.location, u.is_active,
             sr.id as active_request_id, sr.type as task_type, sr.status as task_status, sr.address as destination
      FROM users u
      LEFT JOIN service_requests sr ON u.id = sr.agent_id AND sr.status = 'In Progress'
      WHERE u.role = 'agent' AND u.is_active = 1
    `);
    
    // Format response
    const trackingData = agents.map(agent => ({
      id: agent.id,
      name: agent.name,
      phone: agent.phone,
      location: agent.location || 'Unknown',
      status: agent.active_request_id ? 'Working' : 'Available',
      destination: agent.destination || agent.location || 'Station',
      task: agent.task_type || null
    }));

    res.json(trackingData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all customers
app.get('/api/admin/customers', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.*, u.name as customer_name, u.email as customer_email, p.name as plan_name 
      FROM customers c
      JOIN users u ON c.user_id = u.id
      LEFT JOIN plans p ON c.plan_id = p.id
      ORDER BY c.id DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Create New Customer (Manual Onboarding)
app.post('/api/admin/customers', async (req, res) => {
  const { name, email, phone, address, plan_id } = req.body;
  try {
    let userId;
    let isNewUser = false;
    let initialPassword = '';

    // 1. Check if User exists by email
    const [existingUsers] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      userId = existingUsers[0].id;
    } else {
      // Create new user
      initialPassword = 'pass' + Math.floor(1000 + Math.random() * 9000);
      const [userResult] = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, initialPassword, 'customer']
      );
      userId = userResult.insertId;
      isNewUser = true;
    }

    // 2. Check/Create Customer Profile
    const [existingCust] = await pool.query('SELECT id FROM customers WHERE user_id = ?', [userId]);
    if (existingCust.length === 0) {
      await pool.query(
        'INSERT INTO customers (user_id, address, phone, plan_id, status) VALUES (?, ?, ?, ?, ?)',
        [userId, address, phone, plan_id || null, 'active']
      );
    } else {
      // Update existing profile fields if they provided them
      await pool.query('UPDATE customers SET address = ?, phone = ?, plan_id = COALESCE(?, plan_id) WHERE user_id = ?', [address, phone, plan_id || null, userId]);
    }

    // 3. Send Onboarding Email only if New User
    if (isNewUser) {
      const mailOptions = {
        from: `"Airnetz Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Airnetz - Your Customer Account Details',
        html: `
          <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto;">
            <h2 style="color: #f97316;">Welcome to Airnetz!</h2>
            <p>Hello ${name},</p>
            <p>Your customer account has been created by our administration team.</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p style="margin: 0; font-weight: bold;">Your Login Credentials:</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Temporary Password:</strong> ${initialPassword}</p>
            </div>
            <p>Please log in at: <a href="http://airnetz.sriddha.com/login" style="color: #f97316;">airnetz.sriddha.com/login</a> to manage your account and track services.</p>
          </div>
        `
      };
      try {
        await transporter.sendMail(mailOptions);
        console.log(`Manual onboarding email sent to ${email}`);
      } catch (e) {
        console.error('Customer email failed:', e);
      }
    }

    res.json({ success: true, isNewUser, initialPassword, message: isNewUser ? 'Customer created and email sent' : 'Existing user updated as customer' });
  } catch (error) {
    console.error('Customer Creation Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create New Service Request (Admin Dashboard)
app.post('/api/admin/requests', async (req, res) => {
  const { name, email, phone, address, type, priority, agent_id, description } = req.body;
  try {
    let userId;
    let isNewUser = false;
    let initialPassword = '';

    // 1. Find or Create User
    const [existingUsers] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      userId = existingUsers[0].id;
    } else {
      initialPassword = 'pass' + Math.floor(1000 + Math.random() * 9000);
      const [userResult] = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, initialPassword, 'customer']
      );
      userId = userResult.insertId;
      isNewUser = true;

      // Send User Onboarding Email
      const mailOptions = {
        from: `"Airnetz Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Airnetz - Welcome and Track your Request',
        html: `
          <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto;">
            <h2 style="color: #f97316;">Welcome to Airnetz!</h2>
            <p>Hello ${name},</p>
            <p>A new service request has been logged. We've also set up a customer account for you.</p>
            <div style="background: #fdf2f2; padding: 15px; border-radius: 10px; margin: 20px 0;">
              <p><strong>Login Email:</strong> ${email}</p>
              <p><strong>Temporary Password:</strong> ${initialPassword}</p>
            </div>
            <p>Login at <a href="http://airnetz.sriddha.com/login" style="color:#f97316;">airnetz.sriddha.com/login</a> to track your ticket!</p>
          </div>
        `
      };
      await transporter.sendMail(mailOptions);
    }

    // 2. Ensure Customer Profile
    let customerId;
    const [existingCust] = await pool.query('SELECT id FROM customers WHERE user_id = ?', [userId]);
    if (existingCust.length === 0) {
      const [newCust] = await pool.query(
        'INSERT INTO customers (user_id, address, phone, status) VALUES (?, ?, ?, ?)',
        [userId, address, phone, 'active']
      );
      customerId = newCust.insertId;
    } else {
      customerId = existingCust[0].id;
    }

    // 3. Create Request
    const requestId = `SR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const status = agent_id ? 'In Progress' : 'Pending';
    await pool.query(
      'INSERT INTO service_requests (id, customer_id, type, description, address, phone, priority, status, agent_id, requested_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())',
      [requestId, customerId, type, description || `New manual request for ${type}`, address, phone, priority || 'Medium', status, agent_id || null]
    );

    res.json({ success: true, requestId, isNewUser, initialPassword });
  } catch (err) {
    console.error('Request Creation Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Assign technician
app.post('/api/admin/assign', async (req, res) => {
  const { requestId, agentId } = req.body;
  try {
    await pool.query(
      'UPDATE service_requests SET agent_id = ?, status = "In Progress" WHERE id = ?',
      [agentId, requestId]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Dashboard Stats
app.get('/api/admin/stats', async (req, res) => {
  try {
    const [requestCount] = await pool.query('SELECT COUNT(*) as count FROM service_requests');
    const [agentCount] = await pool.query('SELECT COUNT(*) as count FROM users WHERE role = "agent"');
    const [customerCount] = await pool.query('SELECT COUNT(*) as count FROM customers');
    const [revenueResult] = await pool.query('SELECT SUM(amount) as total FROM payments WHERE MONTH(payment_date) = MONTH(CURRENT_DATE()) AND YEAR(payment_date) = YEAR(CURRENT_DATE())');
    
    res.json({
      totalRequests: requestCount[0].count,
      activeAgents: agentCount[0].count,
      totalCustomers: customerCount[0].count,
      revenue: revenueResult[0].total || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- GENERAL ENDPOINTS ---

// Get all plans
app.get('/api/plans', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM plans');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- PUBLIC & ADMIN LEADS ---

// Public Booking (Enhanced: Creates Lead + Account + Installation Request)
app.post('/api/public/book', async (req, res) => {
  const { name, email, phone, address, locality, serviceType, plan } = req.body;
  
  try {
    // 1. Create Lead Log
    const leadSql = 'INSERT INTO leads (name, email, phone, address, locality, service_type, plan) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [leadResult] = await pool.query(leadSql, [name, email, phone, address, locality, serviceType, plan]);
    const leadId = leadResult.insertId;

    // 2. Create User Account Instantly
    const initialPassword = 'pass' + Math.floor(1000 + Math.random() * 9000);
    const userSql = 'INSERT IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    const [userResult] = await pool.query(userSql, [name, email, initialPassword, 'customer']);
    
    // If user already exists (by email), we should still proceed with creating the service request for them
    let userId;
    if (userResult.insertId) {
      userId = userResult.insertId;
      
      // 3. Create Customer Profile
      const customerSql = 'INSERT INTO customers (user_id, address, phone, status) VALUES (?, ?, ?, ?)';
      await pool.query(customerSql, [userId, address, phone, 'active']);
    } else {
      // User already exists, find their ID
      const [existingUsers] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
      userId = existingUsers[0].id;
    }

    // 4. Get Customer ID
    const [customers] = await pool.query('SELECT id FROM customers WHERE user_id = ?', [userId]);
    const customerId = customers[0].id;

    // 5. Create Installation Service Request
    const requestId = `SR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const srSql = 'INSERT INTO service_requests (id, customer_id, type, description, address, phone, requested_date, status) VALUES (?, ?, ?, ?, ?, ?, CURDATE(), ?)';
    await pool.query(srSql, [requestId, customerId, 'Installation', `New ${serviceType} connection request: ${plan}`, address, phone, 'Pending']);

    // 6. Send Welcome & Tracking Email
    const mailOptions = {
      from: `"Airnetz Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Airnetz - Track Your Installation!',
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
          <h2 style="color: #f97316;">Welcome to the Airnetz Family!</h2>
          <p>Hello ${name},</p>
          <p>Your request for a <strong>${serviceType}</strong> connection has been received and your customer account is now active!</p>
          
          <div style="background: #fdf2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #991b1b;">Your Customer Portal Login:</p>
            <p style="margin: 5px 0;"><strong>User ID (Email):</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Temporary Password:</strong> ${initialPassword}</p>
          </div>

          <p><strong>Tracking Your Installation:</strong></p>
          <p>You can now log in to the portal to track your installation progress (Reference: <strong>${requestId}</strong>) and manage your connection.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://airnetz.sriddha.com/login" style="background: #f97316; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Login to Customer Portal</a>
          </div>

          <p>Our representative will also call you at <strong>${phone}</strong> within 24 hours.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">
          <p style="font-size: 12px; color: #666; text-align: center;">Airnetz Tirupati - High Speed Fiber Broadband</p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Welcome/Tracking email sent to ${email}`);
    } catch (e) {
      console.error('Welcome email failed:', e);
    }

    res.json({ success: true, leadId, requestId });
  } catch (error) {
    console.error('Booking/Account creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Admin Leads
app.get('/api/admin/leads', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
    res.json(results);
  } catch (error) {
    console.error('Leads fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Email Transporter Config
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_PORT === '465', // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false // Helps with certificate issues
  }
});

// Convert Lead to Customer
app.post('/api/leads/convert', async (req, res) => {
  const { leadId } = req.body;
  try {
    // 1. Get Lead Details
    const [leads] = await pool.query('SELECT * FROM leads WHERE id = ?', [leadId]);
    if (leads.length === 0) return res.status(404).json({ error: 'Lead not found' });
    const lead = leads[0];

    // 2. Create User Account (Ignore if exists)
    const initialPassword = 'pass' + Math.floor(1000 + Math.random() * 9000);
    const userSql = 'INSERT IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    const [userResult] = await pool.query(userSql, [lead.name, lead.email, initialPassword, 'customer']);
    
    let isNewUser = false;
    if (userResult.insertId) {
      const userId = userResult.insertId;
      isNewUser = true;

      // 3. Create Customer Profile
      const customerSql = 'INSERT INTO customers (user_id, address, phone, status) VALUES (?, ?, ?, ?)';
      await pool.query(customerSql, [userId, lead.address, lead.phone, 'active']);
    }

    // 4. Update Lead Status
    await pool.query('UPDATE leads SET status = ? WHERE id = ?', ['Converted', leadId]);
          
    // 5. Send Welcome Email ONLY if its a newly created user
    if (isNewUser) {
      const mailOptions = {
        from: `"Airnetz Support" <${process.env.EMAIL_USER}>`,
        to: lead.email,
        subject: 'Welcome to Airnetz - Your Account is Ready!',
        html: `
          <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto;">
            <h2 style="color: #f97316;">Welcome to Airnetz!</h2>
            <p>Hello ${lead.name},</p>
            <p>Your high-speed internet connection request has been approved. We have created your customer portal account.</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p style="margin: 0; font-weight: bold;">Your Login Credentials:</p>
              <p><strong>Email:</strong> ${lead.email}</p>
              <p><strong>Password:</strong> ${initialPassword}</p>
            </div>
            <p>You can login at: <a href="http://airnetz.sriddha.com/login" style="color: #f97316; font-weight: bold;">airnetz.sriddha.com/login</a></p>
            <p>Please change your password after logging in for the first time.</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            <p style="font-size: 12px; color: #9ca3af;">Airnetz Tirupati - High Speed Fiber Broadband</p>
          </div>
        `
      };

      console.log(`Attempting to send welcome email to ${lead.email}...`);
      try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        return res.json({ success: true, message: 'Customer onboarded and email sent' });
      } catch (emailError) {
        console.error('Email failed but account created:', emailError);
        return res.json({ success: true, warning: 'Account created but email failed: ' + emailError.message });
      }
    } else {
      // User already existed (likely from instant booking flow)
      return res.json({ success: true, message: 'Lead marked as converted. Customer account already exists.' });
    }
  } catch (err) {
    console.error('Onboarding conversion error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Fallback for React routing (must be after ALL API routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
