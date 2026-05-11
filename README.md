# TaskFlow - Modern Task Management App

A beautiful, modern task management application built with the latest web technologies.

![TaskFlow](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178c6)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- ✅ Create, update, and delete tasks
- ✏️ Edit tasks with full modal editor
- 🎯 Priority levels (Low, Medium, High)
- 📅 Due dates with overdue indicators
- 🔍 Real-time search by title/description
- 🔄 Sort by date, priority, or title
- 📊 Real-time statistics dashboard
- 💾 Persistent storage with MongoDB
- 📤 Export/Import tasks (CSV & JSON)
- 🎨 Beautiful modern UI with Tailwind CSS
- ⚡ Fast development with Vite
- 📱 Fully responsive design
- 🌈 Smooth animations and transitions
- 💼 Professional sidebar navigation
- ⚙️ Settings with data management

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **In-memory storage** - Fallback option

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

---

## 🌐 **DEPLOYMENT** (Go Live in 10 Minutes!)

### 🎯 Ready to Deploy?

Your app is **100% ready** to deploy for **FREE**! Choose your guide:

1. **⚡ QUICK START** → `QUICK_START_DEPLOYMENT.md` (Recommended - 10 minutes)
2. **📋 DETAILED CHECKLIST** → `DEPLOYMENT_CHECKLIST.md` (Step-by-step with troubleshooting)
3. **📖 COMPLETE GUIDE** → `DEPLOY_NOW.md` (Most detailed)
4. **🎯 START HERE** → `START_HERE.md` (Overview and guide selection)

### What You'll Get:
- ✅ Live URL accessible from anywhere
- ✅ Free hosting (Vercel + Render + MongoDB Atlas)
- ✅ Automatic deployments from GitHub
- ✅ Professional production setup

**Start here**: Open `START_HERE.md` or `QUICK_START_DEPLOYMENT.md`

---

## 💻 Local Development

### Installation

1. Clone the repository:
```bash
git clone https://github.com/meklitwondwosen945-droid/task-manager.git
cd task-manager
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd server
npm install
cd ..
```

### Running the Application

#### Option 1: Run Both Together (Recommended)
```bash
npm run start:all
```

#### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📖 Usage

1. **Create Tasks**: Fill out the form with title, description, priority, and due date
2. **Edit Tasks**: Hover over a task and click the edit icon
3. **Set Priority**: Choose between Low, Medium, or High priority
4. **Due Dates**: Set due dates and see overdue indicators
5. **Complete Tasks**: Click the checkbox to mark tasks as complete
6. **Search**: Use the search bar to find tasks by title or description
7. **Sort**: Sort tasks by date, priority, or title
8. **Filter Tasks**: Use the sidebar to filter by All, Active, or Completed
9. **Delete Tasks**: Hover over a task and click the delete icon
10. **Export/Import**: Open Settings to export/import tasks as CSV or JSON

## 🏗️ Project Structure

```
taskflow/
├── src/                    # Frontend source code
│   ├── components/        # React components
│   │   ├── Sidebar.tsx           # Navigation sidebar
│   │   ├── TaskForm.tsx          # Create task form
│   │   ├── TaskList.tsx          # Task list with search/sort
│   │   ├── TaskItem.tsx          # Individual task card
│   │   ├── TaskStats.tsx         # Statistics dashboard
│   │   ├── TaskEditModal.tsx     # Edit task modal
│   │   ├── SearchBar.tsx         # Search functionality
│   │   └── SettingsModal.tsx     # Settings and data management
│   ├── services/          # API services
│   │   └── api.ts        # Backend API calls
│   ├── store/            # Zustand state management
│   │   └── taskStore.ts  # Task state and actions
│   ├── types/            # TypeScript types
│   │   └── index.ts      # Type definitions
│   ├── config.ts         # Environment configuration
│   └── App.tsx           # Main app component
├── server/                # Backend source code
│   ├── models/           # Database models
│   │   └── Task.js       # Task schema
│   ├── server.js         # Express server
│   └── .env             # Environment variables
├── public/               # Static assets
├── QUICK_START_DEPLOYMENT.md  # ⭐ Quick deployment guide
├── DEPLOYMENT_CHECKLIST.md    # Detailed deployment checklist
├── DEPLOY_NOW.md             # Complete deployment guide
├── START_HERE.md             # Deployment overview
├── FEATURES.md               # Feature documentation
├── CONTRIBUTING.md           # Contribution guidelines
└── package.json              # Dependencies
```

## 🔧 Configuration

### Backend Configuration

Edit `server/.env` to configure:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow?retryWrites=true&w=majority
```

**For local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/taskflow
```

**For deployment:** See deployment guides for MongoDB Atlas setup.

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

**For deployment:** See `QUICK_START_DEPLOYMENT.md` for deploying to Vercel and Render (free!)

---

## 📚 Documentation

- **[START_HERE.md](START_HERE.md)** - Deployment overview and guide selection
- **[QUICK_START_DEPLOYMENT.md](QUICK_START_DEPLOYMENT.md)** - Deploy in 10 minutes
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Detailed deployment checklist
- **[DEPLOY_NOW.md](DEPLOY_NOW.md)** - Complete deployment guide
- **[FEATURES.md](FEATURES.md)** - Feature documentation
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute
- **[CHANGELOG.md](CHANGELOG.md)** - Version history

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Meklit Wondwosen**
- GitHub: [@meklitwondwosen945-droid](https://github.com/meklitwondwosen945-droid)

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from modern task management apps
- Built with ❤️ using React and TypeScript

---

⭐ Star this repo if you find it helpful!
