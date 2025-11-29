# API Documentation

Complete API reference for the EduSmart backend.

## Base URL

```
http://localhost:5000/api
```

## Authentication

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

## Users

### Get All Users
```http
GET /users
```

### Get User by ID
```http
GET /users/:id
```

### Create User
```http
POST /users
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "role": "teacher"
}
```

### Update User
```http
PUT /users/:id
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "teacher"
}
```

### Delete User
```http
DELETE /users/:id
```

## Courses

### Get All Courses
```http
GET /courses
```

### Get Course by ID
```http
GET /courses/:id
```

### Get Courses by Teacher
```http
GET /courses/teacher/:teacherId
```

### Create Course
```http
POST /courses
Content-Type: application/json

{
  "title": "Développement Web",
  "description": "Apprenez les bases du développement web",
  "teacher_id": 1,
  "category": "Développement",
  "level": "Débutant"
}
```

### Update Course
```http
PUT /courses/:id
Content-Type: application/json

{
  "title": "Développement Web Avancé",
  "description": "Cours avancé",
  "category": "Développement",
  "level": "Avancé"
}
```

### Delete Course
```http
DELETE /courses/:id
```

## Students

### Get All Students
```http
GET /students
```

### Get Student by ID
```http
GET /students/:id
```

### Get Students by Course
```http
GET /students/course/:courseId
```

### Create Student
```http
POST /students
Content-Type: application/json

{
  "name": "Ali Ben",
  "email": "ali@example.com",
  "user_id": 2
}
```

### Update Student
```http
PUT /students/:id
Content-Type: application/json

{
  "name": "Ali Ben Ahmed",
  "email": "ali@example.com"
}
```

### Delete Student
```http
DELETE /students/:id
```

## Activities

### Get All Activities
```http
GET /activities
```

### Get Activity by ID
```http
GET /activities/:id
```

### Get Activities by Student
```http
GET /activities/student/:studentId
```

### Get Activities by Course
```http
GET /activities/course/:courseId
```

### Create Activity
```http
POST /activities
Content-Type: application/json

{
  "student_id": 1,
  "course_id": 1,
  "type": "completion",
  "description": "Completed lesson 5"
}
```

### Update Activity
```http
PUT /activities/:id
Content-Type: application/json

{
  "type": "assignment",
  "description": "Submitted homework"
}
```

### Delete Activity
```http
DELETE /activities/:id
```

