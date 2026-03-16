-- Airnetz Database Schema

CREATE DATABASE IF NOT EXISTS airnetz;
USE airnetz;

-- Users table for authentication and RBAC
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'agent', 'customer') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Plans (Broadband, IPTV, OTT)
CREATE TABLE IF NOT EXISTS plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type ENUM('broadband', 'iptv', 'ott', 'combo') NOT NULL,
    price_1m DECIMAL(10, 2),
    price_6m DECIMAL(10, 2),
    price_12m DECIMAL(10, 2),
    speed_mbps INT,
    features TEXT
);

-- Customers
CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    plan_id INT,
    address TEXT,
    phone VARCHAR(20),
    aadhaar_number VARCHAR(20),
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE SET NULL
);

-- Service Requests
CREATE TABLE IF NOT EXISTS service_requests (
    id VARCHAR(50) PRIMARY KEY, -- SR-YYYY-XXX
    customer_id INT,
    agent_id INT,
    type ENUM('Installation', 'Repair', 'Upgrade', 'Relocation') NOT NULL,
    status ENUM('Pending', 'In Progress', 'Completed', 'Cancelled') DEFAULT 'Pending',
    priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
    description TEXT,
    address TEXT,
    phone VARCHAR(20),
    requested_date DATE,
    completed_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (agent_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Public Leads (For new connection requests)
CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    locality VARCHAR(255),
    service_type VARCHAR(50),
    plan VARCHAR(100),
    status ENUM('New', 'Contacted', 'Assigned', 'Converted', 'Rejected') DEFAULT 'New',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method ENUM('cash', 'online', 'upi') NOT NULL,
    status ENUM('pending', 'success', 'failed') DEFAULT 'success',
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Initial Mock Data
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@airnetz.com', 'admin123', 'admin'),
('Suresh Kumar', 'suresh@agent.com', 'agent123', 'agent'),
('Ramesh Gupta', 'ramesh@customer.com', 'pass123', 'customer');

INSERT INTO plans (name, type, price_1m, price_6m, price_12m, speed_mbps) VALUES 
('Turbo 50', 'broadband', 499, 2499, 4499, 50),
('Turbo 100', 'broadband', 699, 3499, 6499, 100),
('Digital IPTV', 'iptv', 300, 1500, 2400, NULL),
('Ultimate OTT', 'ott', 300, 1500, 2400, NULL);
