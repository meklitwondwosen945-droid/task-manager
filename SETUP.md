# 🚀 TaskFlow - Complete Setup Guide

## What You Need to Install

### 1. MongoDB (Choose ONE option)

#### Option A: MongoDB Atlas (Cloud - Easiest, Recommended)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a FREE account
3. Create a FREE cluster (M0 Sandbox)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Update `server/.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow
   ```

#### Option B: Local MongoDB Installation

**Windows:**
1. Download: https://www.mongodb.com/try/download/community
2. Run installer (choose "Complete" installation)
3. MongoDB Compass will be installed (GUI tool)
4. MongoDB runs automatically as a Windows service

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

## 📦 Installation Steps

### Step 1: Install Frontend Dependencies
```bash
npm install
```

### Step 2: Install Backend Dependencies
```bash
cd server
npm install
cd ..
```

### Step 3: Configure Environment
The `.env` file is already created in the `server` folder. If using MongoDB Atlas, update it with your connection string.

## 🎯 Running the Application

### Option 1: Run Both Together (Recommended)
```bash
npm run start:all
```

This starts:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## ✅ Verify Everything Works

1. Backend health check:
   - Open: http://localhost:5000/api/health
   - Should see: `{"status":"OK","message":"Server is running"}`

2. Frontend:
   - Open: http://localhost:5173
   - You should see the TaskFlow app
   - Try creating a task!

## 🐛 Troubleshooting

### "Failed to fetch tasks" error
- Make sure MongoDB is running
- Check if backend server is running on port 5000
- Verify `.env` file has correct MONGODB_URI

### Port already in use
```bash
# Change port in server/.env
PORT=5001
```

### MongoDB connection error
- If using local MongoDB, make sure it's running:
  - Windows: Check Services for "MongoDB"
  - Mac: `brew services list`
  - Linux: `sudo systemctl status mongod`

## 📚 Project Structure

```
taskflow/
├── src/                    # Frontend React app
│   ├── components/        # UI components
│   ├── services/          # API calls
│   ├── store/            # State management
│   └── types/            # TypeScript types
├── server/                # Backend Express app
│   ├── models/           # MongoDB models
│   ├── server.js         # Main server file
│   └── .env             # Environment variables
└── package.json          # Frontend dependencies
```

## 🎨 Features

- ✅ Create, update, delete tasks
- 🎯 Priority levels (Low, Medium, High)
- 🔍 Filter tasks (All, Active, Completed)
- 📊 Task statistics dashboard
- 💾 Persistent storage with MongoDB
- 🎨 Beautiful modern UI
- ⚡ Real-time updates

## 🔧 Development Commands

```bash
# Frontend only
npm run dev

# Backend only
npm run server

# Both together
npm run start:all

# Build for production
npm run build
```

Enjoy using TaskFlow! 🎉
