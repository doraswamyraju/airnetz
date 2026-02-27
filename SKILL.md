---
name: Airnetz Tirupati Deployment
description: Consistency guide for deploying and running the Airnetz Tirupati application on a Hostinger VPS.
---

# Airnetz Tirupati Deployment Guide

This project is a React frontend built with Vite.

## Development

To run the application locally:
```bash
npm install
npm run dev
```

The application runs on port `5005`.

## Production & VPS Deployment

This application is intended to run on a Hostinger VPS under the subdomain `airnetz.sriddha.com`.

### Port Configuration
- The specific port allocated for this application is **5005**.
- Ensure that the application runs on this port to avoid conflicts with other existing applications (which use ports 5001, 5002, 5003, & 5004).

### Deployment Steps (Hostinger VPS)

1. **Create Subdomain**:
   - Go to your Hostinger VPS control panel (or Cyberpanel/aaPanel depending on what you use).
   - Add the subdomain `airnetz.sriddha.com`.
   - Point the DNS A record of `airnetz` to your VPS IP address.

2. **Pull Code**:
   - SSH into your VPS.
   - Navigate to the subdomain's document root (e.g., `/var/www/airnetz.sriddha.com` or similar depending on the server stack).
   - Git clone or pull the repository:
     ```bash
     git clone <your-repo-url> .
     ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Build and Run**:
   - Depending on how you serve Node.js/React applications on your VPS, you can either build it for production (`npm run build`) and serve the `dist` folder via Nginx/Apache.
   - OR, if serving via a process manager like PM2:
     ```bash
     pm2 start npm --name "airnetz-frontend" -- run dev
     ```
   *(Note: For a React/Vite app, it's highly recommended to build and serve statically via Nginx, proxying if necessary).*

5. **Nginx Reverse Proxy**:
   - Since the app uses port 5005, your Nginx configuration for the subdomain should proxy traffic to this port:
     ```nginx
     server {
         listen 80;
         server_name airnetz.sriddha.com;
     
         location / {
             proxy_pass http://127.0.0.0:5005;
             proxy_http_version 1.1;
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection 'upgrade';
             proxy_set_header Host $host;
             proxy_cache_bypass $http_upgrade;
         }
     }
     ```
