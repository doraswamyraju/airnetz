<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/f3ccb8bd-c087-4fe2-b570-f69d78220eb1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Production VPS Deployment

Deploying updates to the live server at `airnetz.sriddha.com` can be done using the following steps:

```bash
# 1. Navigate to the project root directory on the VPS
cd /var/www/airnetz.sriddha.com

# 2. Pull the latest code from GitHub
git pull origin main

# 3. Install client dependencies & build the React frontend
npm install
npm run build

# 4. Install backend dependencies & run database migrations
cd server
npm install
node migrate.js

# 5. Restart the backend process in PM2
pm2 restart airnetz-backend
```

