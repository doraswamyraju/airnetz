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

// Get list of agents
app.get('/api/admin/agents', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email FROM users WHERE role = "agent"');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

// Public Booking
app.post('/api/public/book', async (req, res) => {
  const { name, email, phone, address, locality, serviceType, plan } = req.body;
  const sql = 'INSERT INTO leads (name, email, phone, address, locality, service_type, plan) VALUES (?, ?, ?, ?, ?, ?, ?)';
  try {
    const [result] = await pool.query(sql, [name, email, phone, address, locality, serviceType, plan]);
    const leadId = result.insertId;

    // Send Booking Confirmation Email
    const mailOptions = {
      from: `"Airnetz Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Connection Request Received - Airnetz Tirupati',
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
          <h2 style="color: #f97316;">We've Received Your Request!</h2>
          <p>Hello ${name},</p>
          <p>Thank you for choosing Airnetz. We have received your request for a new <strong>${serviceType}</strong> connection.</p>
          <div style="background: #f9fafb; padding: 15px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Details Provided:</strong></p>
            <ul style="list-style: none; padding: 0;">
              <li>Phone: ${phone}</li>
              <li>Area: ${locality}</li>
              <li>Requested Plan: ${plan || 'To be decided'}</li>
            </ul>
          </div>
          <p>Our representative will contact you at <strong>${phone}</strong> within 24 hours to schedule the installation.</p>
          <p>Once your connection is verified, you will receive another email with your <strong>account login details</strong>.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">
          <p style="font-size: 12px; color: #666; text-align: center;">Airnetz Tirupati - Connectivity Redefined</p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Booking confirmation sent to ${email}`);
    } catch (e) {
      console.error('Initial booking email failed:', e);
    }

    res.json({ success: true, leadId });
  } catch (error) {
    console.error('Booking error:', error);
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

    // 2. Create User Account
    const initialPassword = 'pass' + Math.floor(1000 + Math.random() * 9000);
    const userSql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    
    const [userResult] = await pool.query(userSql, [lead.name, lead.email, initialPassword, 'customer']);
    const userId = userResult.insertId;

    // 3. Create Customer Profile
    const customerSql = 'INSERT INTO customers (user_id, address, phone, status) VALUES (?, ?, ?, ?)';
    await pool.query(customerSql, [userId, lead.address, lead.phone, 'active']);

    // 4. Update Lead Status
    await pool.query('UPDATE leads SET status = ? WHERE id = ?', ['Converted', leadId]);
          
    // 5. Send Welcome Email
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
      res.json({ success: true, message: 'Customer onboarded and email sent' });
    } catch (emailError) {
      console.error('Email failed but account created:', emailError);
      res.json({ success: true, warning: 'Account created but email failed: ' + emailError.message });
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
