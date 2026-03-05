# Job Portal Application (PERN Stack)

## 📌 Overview
* **PostgreSQL**
* **Express.js**
* **React**
* **Node.js**

The platform enables **job seekers, companies, and administrators** to interact within a centralized job marketplace where users can post jobs, apply for opportunities, and manage recruitment processes.

---

# 🚀 Features

## 👨‍💼 Job Seekers

* Browse and search available jobs
* Save favorite job postings
* Apply to job opportunities
* Manage personal profile
* Track application status

## 🏢 Companies

* Post new job openings
* Manage job listings
* Review and evaluate applications
* Maintain company profiles

## 🛡️ Administrators

* Approve or reject new user registrations
* Manage registered companies
* Monitor system activity
* Manage platform users

---

# 🛠️ Technology Stack

## Backend

* **Node.js** – JavaScript runtime
* **Express.js** – Backend web framework
* **PostgreSQL** – Relational database
* **Prisma ORM** – Database ORM and migration tool
* **JWT (JSON Web Tokens)** – Authentication
* **Bcrypt** – Secure password hashing
* **Multer** – File upload handling

## Frontend

* **React** – UI library
* **React Router** – Client-side routing
* **Tailwind CSS** – Utility-first styling framework
* **Axios** – HTTP client
* **React Hook Form** – Form management
* **React Hot Toast** – Notifications
* **date-fns** – Date formatting utilities

---

# 📁 Project Structure

```
JobPortal/
│
├── backendJob/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── .gitignore
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
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
│   │   └── logos/
│   │
│   └── tests/
│       ├── auth.test.js
│       ├── jobs.test.js
│       └── admin.test.js
│
├── frontendJob/
│   ├── package.json
│   ├── .env
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   │
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   │
│   ├── src/
│   │   ├── index.js
│   │   ├── App.js
│   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── auth/
│   │   │   ├── jobs/
│   │   │   ├── admin/
│   │   │   ├── profile/
│   │   │   └── layout/
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
│   │   ├── assets/
│   │   └── types/
│   │
│   └── tests/
│
└── docker-compose.yml (optional)
```

---
 
