import db from '../db/connection.js';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create data directory if it doesn't exist
const dataDir = join(__dirname, '../data');
mkdirSync(dataDir, { recursive: true });

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    teacher_id INTEGER,
    category TEXT,
    level TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    user_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS enrollments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    course_id INTEGER,
    enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
  );

  CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    course_id INTEGER,
    type TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
  );
`);

// Seed data
const hashedPassword = await bcrypt.hash('password123', 10);

// Insert sample users
const teacherId = db.prepare(
  'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)'
).run('Prof. Ahmed', 'ahmed@example.com', hashedPassword, 'teacher').lastInsertRowid;

const studentId = db.prepare(
  'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)'
).run('Ali Ben', 'ali@example.com', hashedPassword, 'student').lastInsertRowid;

// Insert sample courses
const courseId = db.prepare(
  'INSERT INTO courses (title, description, teacher_id, category, level) VALUES (?, ?, ?, ?, ?)'
).run('Développement Web', 'Apprenez les bases du développement web', teacherId, 'Développement', 'Débutant').lastInsertRowid;

// Insert sample student
const studentRecordId = db.prepare(
  'INSERT INTO students (name, email, user_id) VALUES (?, ?, ?)'
).run('Ali Ben', 'ali@example.com', studentId).lastInsertRowid;

// Insert enrollment
db.prepare(
  'INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)'
).run(studentRecordId, courseId);

console.log('Database seeded successfully!');
process.exit(0);

