# TaskFlow - Modern Task Management App

A beautiful, modern task management application built with the latest web technologies.

![TaskFlow](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178c6)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- ✅ Create, update, and delete tasks
- 🎯 Priority levels (Low, Medium, High)
- 🔍 Filter tasks (All, Active, Completed)
- 📊 Real-time statistics dashboard
- 💾 Persistent storage with backend API
- 🎨 Beautiful modern UI with Tailwind CSS
- ⚡ Fast development with Vite
- 📱 Fully responsive design
- 🌈 Smooth animations and transitions
- 💼 Professional sidebar navigation
- ⚙️ Settings with export/import functionality

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
- **MongoDB** - Database (optional)
- **In-memory storage** - Default storage

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

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

1. **Create Tasks**: Click on the form in the left panel to add new tasks
2. **Set Priority**: Choose between Low, Medium, or High priority
3. **Complete Tasks**: Click the checkbox to mark tasks as complete
4. **Filter Tasks**: Use the sidebar to filter by All, Active, or Completed
5. **Delete Tasks**: Hover over a task and click the delete icon
6. **Export Data**: Open Settings to export your tasks as JSON

## 🏗️ Project Structure

```
taskflow/
├── src/                    # Frontend source code
│   ├── components/        # React components
│   │   ├── Sidebar.tsx
│   │   ├── TaskForm.tsx
│   │   ├── TaskList.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskStats.tsx
│   │   └── SettingsModal.tsx
│   ├── services/          # API services
│   ├── store/            # Zustand state management
│   ├── types/            # TypeScript types
│   └── App.tsx           # Main app component
├── server/                # Backend source code
│   ├── models/           # Database models
│   ├── server.js         # Express server
│   └── .env             # Environment variables
├── public/               # Static assets
└── package.json          # Dependencies
```

## 🔧 Configuration

### Backend Configuration

Edit `server/.env` to configure:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskflow
```

For MongoDB Atlas (cloud):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow
```

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

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
