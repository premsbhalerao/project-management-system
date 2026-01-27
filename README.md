# 🚀 Project Management System

A complete full-stack web application for managing projects and tasks, built with **Django** (backend) and **Next.js** (frontend). Developed as a Full-Stack Developer Intern assignment.

## ✨ Features Implemented
✅ **User Authentication System** - JWT-based authentication ready  
✅ **Project Management** - Create, view, and manage projects  
✅ **Task Management** - Add, update, and track tasks with status (TODO, IN_PROGRESS, DONE)  
✅ **Dashboard** - Real-time statistics of projects and tasks  
✅ **RESTful APIs** - Well-structured API endpoints  
✅ **Modern UI** - Responsive design with clean interface  
✅ **Backend-Frontend Integration** - Seamless communication between services  

## 🛠️ Tech Stack
- **Backend**: Django 5.2 + Django REST Framework
- **Frontend**: Next.js 14 + TypeScript
- **Database**: SQLite (Development)
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS-in-JS with responsive design
- **API Communication**: RESTful APIs with CORS support

## 📁 Project Structure
```
project-management-system/
├── backend/                  # Django REST API
│   ├── settings.py          # Django configuration
│   ├── urls.py              # API endpoints routing
│   ├── views.py             # API logic
│   └── models.py            # Database models
├── frontend/                # Next.js Frontend
│   ├── app/
│   │   ├── page.tsx         # Main dashboard page
│   │   ├── layout.tsx       # Application layout
│   │   ├── projects/        # Projects page
│   │   └── tasks/           # Tasks page
│   ├── components/          # Reusable components
│   └── utils/               # Utility functions
├── requirements.txt         # Python dependencies
├── package.json            # Node.js dependencies
└── README.md               # This documentation
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+ and pip
- Node.js 16+ and npm
- Git (optional)

### Installation & Setup

#### 1. Backend Setup (Django)
```bash
# Clone the repository
git clone https://github.com/yourusername/project-management-system.git
cd project-management-system

# Install Python dependencies
pip install django djangorestframework django-cors-headers

# Run database migrations
python manage.py migrate

# Create superuser (optional, for admin panel)
python manage.py createsuperuser

# Start the backend server
python manage.py runserver
```
✅ **Backend running at:** http://localhost:8000

#### 2. Frontend Setup (Next.js)
```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Start the frontend development server
npm run dev
```
✅ **Frontend running at:** http://localhost:3000

## 🔗 API Endpoints
| Method | Endpoint | Description | Requires Auth |
|--------|----------|-------------|---------------|
| GET | `/api/projects/` | Get all projects | Yes |
| POST | `/api/projects/` | Create new project | Yes |
| GET | `/api/projects/{id}/` | Get specific project | Yes |
| PUT | `/api/projects/{id}/` | Update project | Yes |
| DELETE | `/api/projects/{id}/` | Delete project | Yes |
| GET | `/api/tasks/` | Get all tasks | Yes |
| POST | `/api/tasks/` | Create new task | Yes |
| POST | `/api/register/` | User registration | No |
| POST | `/api/login/` | User login (JWT) | No |

## 📋 Core Functionalities

### 1. Authentication & Authorization
- User registration and login
- JWT token-based authentication
- Protected API endpoints
- Secure password handling

### 2. Project Management
- Create new projects with name and description
- View all projects in a clean interface
- Edit existing project details
- Delete projects with confirmation

### 3. Task Management
- Add tasks to specific projects
- Update task status (TODO → IN_PROGRESS → DONE)
- View tasks filtered by project
- Delete tasks when completed

### 4. Dashboard
- Total projects count
- Total tasks count
- Completed tasks count
- Visual statistics and charts
- Recent activity feed

## 🎯 Assignment Requirements Checklist
- [x] **Backend API Development** - Django REST Framework with JWT authentication
- [x] **Frontend Integration** - Next.js app consuming APIs
- [x] **Authentication Handling** - User registration, login, token management
- [x] **Data Modeling** - Project and Task models with relationships
- [x] **Code Quality** - Clean, readable, and well-structured code
- [x] **Problem Solving** - Full-stack implementation from scratch

## 🏗️ Architecture Design
```
Client (Browser) → Next.js Frontend → Django REST API → SQLite Database
                    (localhost:3000)   (localhost:8000)
```
- **Frontend**: React components with state management
- **Backend**: Django models, serializers, and views
- **Communication**: REST APIs with JSON data exchange
- **Security**: JWT tokens for authenticated requests

## 📊 Database Schema
```python
# Simplified models
class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
```

## 🖼️ UI/UX Features
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Dark/Light Theme**: Eye-friendly color schemes
- **Loading States**: Skeleton loaders during API calls
- **Error Handling**: User-friendly error messages
- **Interactive Elements**: Hover effects, transitions, animations

## 🔧 Development & Deployment

### Development
```bash
# Backend development
python manage.py runserver

# Frontend development
npm run dev

# Running tests
python manage.py test
npm run test
```

### Production Deployment
1. **Backend**: Deploy on Railway/Render/Heroku with PostgreSQL
2. **Frontend**: Deploy on Vercel/Netlify
3. **Environment Variables**: Configure database and secret keys
4. **CORS**: Update allowed origins for production domain

## 🐛 Troubleshooting
| Issue | Solution |
|-------|----------|
| Port 8000 already in use | Use `python manage.py runserver 8001` |
| Port 3000 already in use | Use `npm run dev -- -p 3001` |
| CORS errors | Ensure `django-cors-headers` is installed and configured |
| Module not found | Run `pip install -r requirements.txt` and `npm install` |
| Database errors | Run `python manage.py migrate` |

## 📈 Future Enhancements
- [ ] Role-based access control (Admin/User roles)
- [ ] File attachments for tasks
- [ ] Email notifications
- [ ] Real-time updates with WebSockets
- [ ] Advanced search and filtering
- [ ] Export data as CSV/PDF
- [ ] Mobile app with React Native

## 👨‍💻 Developer
**Prem Bhalerao**  
📧 prembhalerao@example.com  
🔗 [GitHub Profile](https://github.com/premsbhalerao)  
💼 [LinkedIn Profile](https://linkedin.com/in/premsbhalerao)

## 📄 License
This project is developed for educational purposes as part of a Full-Stack Developer assignment.

## 🙏 Acknowledgments
- Django and Next.js documentation teams
- Assignment evaluators for the opportunity
- Open-source community for amazing tools and libraries

---

## 🎯 Quick Start Summary
```bash
# Backend
cd project-management-system
pip install django djangorestframework
python manage.py runserver

# Frontend  
cd frontend
npm install
npm run dev

# Access at http://localhost:3000
```

**Happy Coding! 🚀**
