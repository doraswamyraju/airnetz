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

This application is intended to run on a Hostinger VPS under the domain `airnetz.net.in`.

### Port Configuration
- The specific port allocated for this application is **5005**.
- Ensure that the application runs on this port to avoid conflicts with other existing applications (which use ports 5001, 5002, 5003, & 5004).

### Deployment Steps (Hostinger VPS)

1. **Create Subdomain**:
   - Go to your Hostinger VPS control panel (or Cyberpanel/aaPanel depending on what you use).
   - Add the domain `airnetz.net.in`.
   - Point the DNS A record of `airnetz` to your VPS IP address.

2. **Pull Code**:
   - SSH into your VPS.
   - Navigate to the domain's document root (e.g., `/var/www/airnetz.net.in` or similar depending on the server stack).
   - Git clone or pull the repository:
     ```bash
     git clone <your-repo-url> .
     ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Build and Run**:
   - For a production deployment, build the React/Vite frontend static files and serve the `dist` folder via Nginx.
     ```bash
     npm run build
     ```
   - Alternatively, if running the development server under PM2 (for staging/testing):
     ```bash
     pm2 start npm --name "airnetz-frontend" -- run dev -- --port 5005
     ```
   - To deploy and run the Node.js backend:
     ```bash
     cd server
     npm install
     node migrate.js
     pm2 start server.js --name "airnetz-backend"
     ```

5. **Nginx Reverse Proxy**:
   - Setup a reverse proxy configuration block for your domain / subdomain to forward requests to the frontend port (5005) or serve static files directly:
     ```nginx
     server {
         listen 80;
         server_name airnetz.net.in;
     
         # Option A: Serve built static files directly (Recommended)
         location / {
             root /var/www/airnetz.net.in/dist;
             try_files $uri $uri/ /index.html;
         }

         # Option B: Reverse proxy to PM2 runner (if running dev server on 5005)
         # location / {
         #     proxy_pass http://127.0.0.1:5005;
         #     proxy_http_version 1.1;
         #     proxy_set_header Upgrade $http_upgrade;
         #     proxy_set_header Connection 'upgrade';
         #     proxy_set_header Host $host;
         #     proxy_cache_bypass $http_upgrade;
         # }

         location /api {
             proxy_pass http://127.0.0.1:5000; # Assuming backend runs on 5000
             proxy_http_version 1.1;
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection 'upgrade';
             proxy_set_header Host $host;
             proxy_cache_bypass $http_upgrade;
         }
     }
     ```
