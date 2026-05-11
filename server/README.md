# TaskFlow Backend Server

Express + MongoDB backend for TaskFlow task management app.

## Prerequisites

You need to install MongoDB. Choose one option:

### Option 1: MongoDB Atlas (Cloud - Recommended for beginners)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free cluster
4. Get your connection string
5. Update `.env` file with your connection string

### Option 2: Local MongoDB Installation

**Windows:**
1. Download from https://www.mongodb.com/try/download/community
2. Run the installer
3. MongoDB will run automatically as a service

**Mac (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

## Setup Instructions

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
- Copy `.env.example` to `.env` (already done)
- Update `MONGODB_URI` if using MongoDB Atlas

4. Start the server:
```bash
npm run dev
```

Server will run on http://localhost:5000

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/health` - Health check

## Testing the API

You can test with curl:
```bash
# Get all tasks
curl http://localhost:5000/api/tasks

# Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","priority":"high"}'
```
