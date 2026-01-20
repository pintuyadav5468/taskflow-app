# TaskFlow - Enterprise Task Management System

A full-stack task management application built with modern web technologies, featuring authentication, CRUD operations, and responsive design.

## 🚀 Live Demo

- **Frontend:** [https://your-app.vercel.app](https://your-app.vercel.app)
- **Backend API:** [https://your-api.vercel.app](https://your-api.vercel.app)

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## ✨ Features

- ✅ User authentication (Register/Login/Logout)
- ✅ JWT-based authorization
- ✅ Create, Read, Update, Delete (CRUD) tasks
- ✅ Task filtering by status and priority
- ✅ Search functionality
- ✅ Dashboard with statistics
- ✅ User profile management
- ✅ Responsive design (mobile-friendly)
- ✅ RESTful API design
- ✅ Input validation
- ✅ Error handling

## 📁 Project Structure

```
taskflow-app/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── api/           # API configuration
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── package.json
│
└── server/                # Backend Node.js application
    ├── models/            # Mongoose models
    ├── routes/            # API routes
    ├── middleware/        # Custom middleware
    ├── server.js          # Entry point
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/taskflow-app.git
cd taskflow-app
```

2. **Setup Backend**
```bash
cd server
npm install

# Create .env file
cp .env.example .env
# Update .env with your MongoDB URI and JWT secret
```

3. **Setup Frontend**
```bash
cd ../client
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

4. **Run the application**

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## 🔑 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Tasks
- `GET /api/tasks` - Get all tasks (Protected)
- `GET /api/tasks/:id` - Get single task (Protected)
- `POST /api/tasks` - Create task (Protected)
- `PUT /api/tasks/:id` - Update task (Protected)
- `DELETE /api/tasks/:id` - Delete task (Protected)
- `GET /api/tasks/stats/summary` - Get task statistics (Protected)

### Users
- `GET /api/users` - Get all users (Protected)
- `GET /api/users/:id` - Get user by ID (Protected)
- `PUT /api/users/profile` - Update profile (Protected)

## 🎨 Screenshots

[Add screenshots of your application here]

## 🚢 Deployment

### Deploy to Vercel

**Backend:**
```bash
cd server
vercel
```

**Frontend:**
```bash
cd client
npm run build
vercel --prod
```

Update environment variables in Vercel dashboard for both projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Styling by [Tailwind CSS](https://tailwindcss.com/)
- Built with [React](https://react.dev/) and [Node.js](https://nodejs.org/)
