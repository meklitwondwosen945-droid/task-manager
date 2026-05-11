# Deployment Guide

This guide will help you deploy TaskFlow to various platforms.

## Prerequisites

- Node.js 18+ installed
- MongoDB database (local or Atlas)
- Git repository

## Option 1: Deploy to Vercel (Frontend) + Railway (Backend)

### Frontend (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add Environment Variable:
   - `VITE_API_URL`: Your backend URL (from Railway)
7. Deploy!

### Backend (Railway)

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure:
   - Root Directory: `server`
   - Start Command: `npm start`
5. Add Environment Variables:
   - `PORT`: 5000
   - `MONGODB_URI`: Your MongoDB connection string
6. Deploy!

## Option 2: Deploy to Render (Full Stack)

### Backend

1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Name: taskflow-api
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB connection string
6. Deploy!

### Frontend

1. Click "New" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
4. Add Environment Variable:
   - `VITE_API_URL`: Your backend URL
5. Deploy!

## Option 3: Deploy to Heroku

### Backend

```bash
cd server
heroku create taskflow-api
heroku addons:create mongolab:sandbox
git subtree push --prefix server heroku main
```

### Frontend

```bash
heroku create taskflow-app
heroku config:set VITE_API_URL=https://taskflow-api.herokuapp.com
git push heroku main
```

## Option 4: Deploy to DigitalOcean App Platform

1. Go to [DigitalOcean](https://www.digitalocean.com)
2. Create new App
3. Connect GitHub repository
4. Configure components:
   - Backend: Node.js service (server directory)
   - Frontend: Static site (root directory)
5. Add environment variables
6. Deploy!

## MongoDB Setup

### MongoDB Atlas (Recommended)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all)
5. Get connection string
6. Update `MONGODB_URI` in your deployment

## Environment Variables

### Frontend
- `VITE_API_URL`: Backend API URL

### Backend
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `NODE_ENV`: production

## Post-Deployment

1. Test all features
2. Check API endpoints
3. Verify database connection
4. Test on mobile devices
5. Monitor error logs

## Troubleshooting

### CORS Issues
Update `server/server.js`:
```javascript
app.use(cors({
  origin: 'https://your-frontend-url.com'
}));
```

### Build Failures
- Check Node.js version
- Verify all dependencies are in package.json
- Check build logs for errors

### Database Connection
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

## Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Render
1. Go to Settings → Custom Domains
2. Add your domain
3. Update DNS records

## SSL/HTTPS

All recommended platforms provide free SSL certificates automatically.

## Monitoring

- Set up error tracking (Sentry, LogRocket)
- Monitor API performance
- Set up uptime monitoring
- Check database metrics

## Backup

- Regular database backups
- Export tasks feature in Settings
- Version control with Git

Need help? Create an issue on GitHub!
