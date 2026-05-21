# QR Cafe Menu System - Backend

This folder contains the backend API for the QR Cafe Menu System, built with Express and PostgreSQL.

## Overview

The backend provides the core server-side functionality for the cafe app, including user authentication, menu and category management, order processing, file uploads, and admin dashboard metrics.

## Key Features

- JWT-based authentication for admin access
- Public menu browsing and order creation
- Admin-only management for categories, menu items, and users
- Order status updates and history retrieval
- Image upload support using Cloudinary
- Dashboard summary data for orders, revenue, top items, and peak hours

## Project Structure

- `server.js` — application entrypoint
- `src/app.js` — Express app configuration and route setup
- `src/config/` — database and Cloudinary connection configuration
- `src/routes/` — API route definitions for auth, categories, menu, orders, users, uploads, and admin dashboard
- `src/controllers/` — request handlers for business logic and database interaction
- `src/services/` — service layer implementation supporting controllers
- `src/middleware/` — authentication, authorization, and error-handling middleware

## Dependencies

- `express` — HTTP server framework
- `cors` — cross-origin request handling
- `dotenv` — environment variable loader
- `jsonwebtoken` — JWT auth
- `bcrypt` — password hashing
- `pg` — PostgreSQL client
- `multer` — file upload parsing
- `cloudinary` — media upload and storage

## Environment Variables

Create a `.env` file with these values:

- `PORT` — server port (default: `5000`)
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — secret key for JWT tokens
- `CLOUDINARY_CLOUD_NAME` — Cloudinary cloud name
- `CLOUDINARY_API_KEY` — Cloudinary API key
- `CLOUDINARY_API_SECRET` — Cloudinary API secret

## Local Setup

Install dependencies:

```bash
npm install
```

Start the backend in development mode:

```bash
npm run dev
```

Start the backend in production mode:

```bash
npm start
```

## Notes

- The backend is designed to work with the frontend app in `frontend/vite-project`.
- API routes are mounted under paths like `/auth`, `/categories`, `/menu`, `/orders`, `/users`, `/upload`, and `/admin/dashboard`.
- Admin routes require a valid JWT and admin role.
- File uploads are validated for type and size before sending to Cloudinary.
