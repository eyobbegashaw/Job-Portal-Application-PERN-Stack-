# Job Portal Application - PERN Stack Migration

## 📋 Overview
This is a complete migration of a legacy JavaFX Job Portal application to the modern PERN stack (PostgreSQL, Express.js, React, Node.js). The application provides a platform for job seekers, companies, and administrators to manage job postings, applications, and user management.

## 🚀 Features

### For Job Seekers
- Browse and search for jobs
- Save favorite jobs
- Apply for jobs
- Manage profile
- View application status

### For Companies
- Post new job opportunities
- Manage job listings
- Review applications
- Company profile management

### For Administrators
- Approve/reject user registrations
- Manage companies
- Monitor platform activity
- User management

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Prisma ORM** - Database toolkit
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications
- **Date-fns** - Date formatting

## 📁 Project Structure
JobPortal/
│
├── backendJob/
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   ├── .gitignore
│   ├── server.js
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │       └── (migration files will be here after running prisma migrate)
│   │
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── jobController.js
│   │   │   ├── adminController.js
│   │   │   └── userController.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── jobRoutes.js
│   │   │   ├── adminRoutes.js
│   │   │   └── userRoutes.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── validationMiddleware.js
│   │   │   └── uploadMiddleware.js
│   │   │
│   │   ├── utils/
│   │   │   ├── validation.js
│   │   │   └── fileHandler.js
│   │   │
│   │   └── config/
│   │       └── database.js
│   │
│   ├── uploads/
│   │   ├── profiles/
│   │   │   └── (profile images will be stored here)
│   │   └── logos/
│   │       └── (company logos will be stored here)
│   │
│   └── tests/
│       ├── auth.test.js
│       ├── jobs.test.js
│       └── admin.test.js
│
├── frontendJob/
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   ├── .gitignore
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── README.md
│   │
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   │
│   ├── src/
│   │   ├── index.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.css
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.js
│   │   │   │   ├── Footer.js
│   │   │   │   ├── LoadingSpinner.js
│   │   │   │   ├── ErrorBoundary.js
│   │   │   │   ├── PrivateRoute.js
│   │   │   │   ├── JobCard.js
│   │   │   │   └── Alert.js
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.js
│   │   │   │   ├── RegisterForm.js
│   │   │   │   └── ForgotPassword.js
│   │   │   │
│   │   │   ├── jobs/
│   │   │   │   ├── JobList.js
│   │   │   │   ├── JobDetails.js
│   │   │   │   ├── PostJobForm.js
│   │   │   │   ├── JobFilters.js
│   │   │   │   └── SavedJobsList.js
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── AdminPanel.js
│   │   │   │   ├── PendingUsersList.js
│   │   │   │   ├── CompanyManagement.js
│   │   │   │   └── AdminStats.js
│   │   │   │
│   │   │   ├── profile/
│   │   │   │   ├── UserProfile.js
│   │   │   │   ├── EditProfile.js
│   │   │   │   └── ProfileImage.js
│   │   │   │
│   │   │   └── layout/
│   │   │       ├── Header.js
│   │   │       ├── Sidebar.js
│   │   │       └── MainLayout.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Jobs.js
│   │   │   ├── JobDetails.js
│   │   │   ├── PostJob.js
│   │   │   ├── AdminPanel.js
│   │   │   ├── SavedJobs.js
│   │   │   ├── Profile.js
│   │   │   └── NotFound.js
│   │   │
│   │   ├── contexts/
│   │   │   ├── AuthContext.js
│   │   │   ├── JobContext.js
│   │   │   └── ThemeContext.js
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useJobs.js
│   │   │   ├── useForm.js
│   │   │   └── useLocalStorage.js
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── jobService.js
│   │   │   ├── adminService.js
│   │   │   └── userService.js
│   │   │
│   │   ├── utils/
│   │   │   ├── validation.js
│   │   │   ├── formatters.js
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   │
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   │   └── (static images)
│   │   │   ├── fonts/
│   │   │   │   └── (custom fonts)
│   │   │   └── styles/
│   │   │       └── (additional CSS files)
│   │   │
│   │   └── types/
│   │       └── (TypeScript type definitions if using TypeScript)
│   │
│   └── tests/
│       ├── components/
│       │   └── (component tests)
│       ├── pages/
│       │   └── (page tests)
│       └── utils/
│           └── (utility function tests)
│
└── docker-compose.yml (optional, for containerization)
