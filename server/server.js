import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js';

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

// Fallback for React routing (must be after API routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Public Booking
app.post('/api/public/book', (req, res) => {
  const { name, email, phone, address, locality, serviceType, plan } = req.body;
  const sql = 'INSERT INTO leads (name, email, phone, address, locality, service_type, plan) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, email, phone, address, locality, serviceType, plan], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, leadId: result.insertId });
  });
});

// Admin Leads
app.get('/api/admin/leads', (req, res) => {
  db.query('SELECT * FROM leads ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

import nodemailer from 'nodemailer';

// Email Transporter (Gatla Foundation / SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Convert Lead to Customer
app.post('/api/leads/convert', (req, res) => {
  const { leadId } = req.body;

  // 1. Get Lead Details
  db.query('SELECT * FROM leads WHERE id = ?', [leadId], (err, leads) => {
    if (err || leads.length === 0) return res.status(404).json({ error: 'Lead not found' });
    const lead = leads[0];

    // 2. Create User Account
    const initialPassword = 'pass' + Math.floor(1000 + Math.random() * 9000); // Generate simple password
    const userSql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    
    db.query(userSql, [lead.name, lead.email, initialPassword, 'customer'], (err, userResult) => {
      if (err) return res.status(500).json({ error: 'Email already exists or conversion failed' });
      const userId = userResult.insertId;

      // 3. Create Customer Profile
      const customerSql = 'INSERT INTO customers (user_id, address, phone, status) VALUES (?, ?, ?, ?)';
      db.query(customerSql, [userId, lead.address, lead.phone, 'active'], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to create customer profile' });

        // 4. Update Lead Status
        db.query('UPDATE leads SET status = ? WHERE id = ?', ['Converted', leadId], (err) => {
          
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

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Email error:', error);
              return res.json({ success: true, warning: 'Account created but welcome email failed' });
            }
            res.json({ success: true, message: 'Customer onboarded successfully' });
          });
        });
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
