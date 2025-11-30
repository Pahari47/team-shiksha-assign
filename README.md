# Team Shiksha Assignment — Auth + Dashboard Web App  
A full-stack authentication system built using **Next.js (App Router)**, **TypeScript**, **Prisma**, **PostgreSQL**, **JWT Auth**, **TailwindCSS**, and **Jest** for testing.

This project includes:

- User Sign Up / Sign In  
- JWT-based authentication with HttpOnly cookies  
- Fully responsive UI  
- Dashboard with user profile view + edit  
- Backend API routes using Next.js App Router  
- Prisma ORM + PostgreSQL  
- Full Jest test suite  
- Production-ready deployment setup for Vercel  

---

## 🚀 Tech Stack

### Frontend
- **Next.js 16 (App Router)**
- **TypeScript**
- **TailwindCSS**
- Fully responsive UI components (Input, Button, Navbar)

### Backend
- **Prisma ORM**
- **PostgreSQL**
- **API Routes** with validation (Zod)
- **JWT Authentication (HttpOnly Cookies)**

### Testing
- **Jest**
- **ts-jest**
- Prisma mocking for isolated backend tests

### Deployment
- **Vercel** (optimized for Prisma)

---

## Setup Guide

git clone https://github.com/Pahari47/team-shiksha-assign.git



```env
## add .env

DATABASE_URL="postgresql://<username>:<password>@<host>/<db>?sslmode=require" (suggest to use docker to run locally postgress)
JWT_SECRET="your-secure-secret"

## Install dependencies

npm install

## migrate db

npx prisma migrate dev

## generate client

npx prisma generate

## run server

npm run dev

## test all 6 crUd

npm test

