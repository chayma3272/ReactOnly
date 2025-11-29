# EduSmart Backend API

Complete Express.js + SQLite backend for the EduSmart React frontend.

## Features

- RESTful API
- SQLite database
- JWT authentication
- User management (teachers and students)
- Course management
- Student enrollment
- Activity tracking

## Installation

```bash
cd backend
npm install
```

## Database Setup

```bash
npm run seed
```

This will create the database and seed it with sample data.

## Running the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `GET /api/courses/teacher/:teacherId` - Get courses by teacher
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `GET /api/students/course/:courseId` - Get students by course
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Activities
- `GET /api/activities` - Get all activities
- `GET /api/activities/:id` - Get activity by ID
- `GET /api/activities/student/:studentId` - Get activities by student
- `GET /api/activities/course/:courseId` - Get activities by course
- `POST /api/activities` - Create activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

## Database

The SQLite database file is stored at `./data/edusmart.sqlite` (relative to backend folder).

