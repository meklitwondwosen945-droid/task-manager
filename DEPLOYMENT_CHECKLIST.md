# 🚀 TaskFlow Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. MongoDB Atlas Setup
- [ ] MongoDB Atlas account created
- [ ] Free M0 cluster created
- [ ] Database user created (username: `meklitwondwosen945_db_user`)
- [ ] Network access configured (0.0.0.0/0 for all IPs)
- [ ] Connection string copied and password replaced

**Your current connection string format:**
```
mongodb+srv://meklitwondwosen945_db_user:YOUR_ACTUAL_PASSWORD@cluster0.t3yvksc.mongodb.net/taskflow?retryWrites=true&w=majority
```

⚠️ **IMPORTANT**: Replace `<db_password>` with your actual MongoDB password!

---

## 🎯 Deployment Steps

### Step 1: Update MongoDB Password Locally (REQUIRED)

1. Open `server/.env` file
2. Replace `<db_password>` with your actual MongoDB Atlas password
3. Test locally:
   ```bash
   cd server
   npm start
   ```
4. You should see: `✅ Connected to MongoDB Atlas`

### Step 2: Commit and Push to GitHub

```bash
# Make sure you're in the root directory
git add .
git commit -m "feat: add MongoDB support and deployment configuration"
git push origin main
```

### Step 3: Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `task-manager`
4. Configure:
   - **Name**: `taskflow-api`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. **Environment Variables** (Click "Advanced"):
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://meklitwondwosen945_db_user:YOUR_PASSWORD@cluster0.t3yvksc.mongodb.net/taskflow?retryWrites=true&w=majority`
   - ⚠️ Replace `YOUR_PASSWORD` with your actual password!

6. Click **"Create Web Service"**
7. Wait 2-3 minutes for deployment
8. **Copy your backend URL**: `https://taskflow-api.onrender.com` (or similar)

### Step 4: Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Import `task-manager` repository
4. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Environment Variables**:
   - Key: `VITE_API_URL`
   - Value: Your Render backend URL (e.g., `https://taskflow-api.onrender.com`)
   - ⚠️ **NO trailing slash!**

6. Click **"Deploy"**
7. Wait 1-2 minutes
8. Click **"Visit"** to see your live app! 🎉

---

## 🧪 Testing Your Deployment

### Backend Health Check
Visit: `https://your-backend-url.onrender.com/api/health`

Should return:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### Frontend Testing
1. Open your Vercel URL
2. Create a test task
3. Refresh the page - task should persist
4. Try all features:
   - ✅ Create, edit, delete tasks
   - ✅ Mark as complete
   - ✅ Search and filter
   - ✅ Export/Import CSV
   - ✅ Due dates

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: "MongoDB connection error"
- **Solution**: Check your MongoDB password in Render environment variables
- Verify network access is set to 0.0.0.0/0 in MongoDB Atlas

**Problem**: "Backend not responding"
- **Solution**: Render free tier sleeps after 15 min inactivity
- First request takes 30 seconds to wake up
- Use UptimeRobot to keep it awake (optional)

**Problem**: "Build failed"
- **Solution**: Check Render logs for errors
- Verify `server/package.json` has all dependencies

### Frontend Issues

**Problem**: "Failed to fetch tasks"
- **Solution**: Check `VITE_API_URL` in Vercel settings
- Make sure backend URL has no trailing slash
- Verify backend is running (check health endpoint)

**Problem**: "CORS error"
- **Solution**: Backend already configured for CORS
- If persists, check Render logs

**Problem**: "Environment variable not working"
- **Solution**: After changing env vars in Vercel, you must redeploy
- Go to Deployments → Click "..." → "Redeploy"

---

## 📊 Monitoring

### Render Dashboard
- View logs: Click on your service → "Logs" tab
- Check status: Green = running, Yellow = deploying
- Monitor usage: Free tier has 750 hours/month

### Vercel Dashboard
- Analytics: See visitor stats
- Deployments: View all deployments
- Logs: Check for errors

---

## 🎯 Post-Deployment

### Optional Enhancements

1. **Custom Domain** (Free):
   - Vercel: Settings → Domains → Add domain
   - Render: Settings → Custom Domain

2. **Keep Backend Awake**:
   - Sign up at [UptimeRobot](https://uptimerobot.com)
   - Add your backend URL
   - Set ping interval to 5 minutes

3. **Enable Analytics**:
   - Vercel provides free analytics
   - Enable in project settings

---

## 📝 Important Notes

### Free Tier Limits
- **Render**: 750 hours/month, sleeps after 15 min inactivity
- **Vercel**: Unlimited bandwidth, 100 GB-hours
- **MongoDB Atlas**: 512 MB storage (thousands of tasks)

### Security
- Never commit `.env` files with real passwords
- Use environment variables for all secrets
- MongoDB password should be strong (12+ characters)

### Updates
To update your deployed app:
```bash
git add .
git commit -m "your update message"
git push origin main
```
- Render: Auto-deploys on push
- Vercel: Auto-deploys on push

---

## ✅ Deployment Complete!

Your TaskFlow app is now live and accessible worldwide!

**Share your URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-api.onrender.com`

**Total Time**: ~10 minutes
**Total Cost**: $0 (100% FREE)

---

## 🆘 Need Help?

1. Check deployment logs in Render/Vercel
2. Verify all environment variables
3. Test backend health endpoint
4. Review this checklist again
5. Check MongoDB Atlas connection

**Common Issues**: See Troubleshooting section above

---

**Last Updated**: May 11, 2026
**Version**: 1.0.0
