# QR Café Menu System

A full-stack café ordering and management application. Customers can browse a digital menu and place orders, while café staff can manage menu content and follow order activity through an administrative interface.

## Features

- **Digital menu:** Browse menu items grouped by category.
- **QR-based table ordering:** Customers can access the menu and submit an order with a table number.
- **Order workflow:** Create orders and update their status.
- **Menu administration:** Create, edit, enable/disable, and remove menu items.
- **Category administration:** Create, edit, and remove menu categories.
- **Admin dashboard:** View order and revenue summaries, daily revenue, category sales, popular items, and peak ordering hours.
- **Image uploads:** Upload menu and category images to Cloudinary.
- **Authentication:** JWT login with role checks on protected menu and category management routes.

## Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, Vite, Tailwind CSS, React Router |
| Backend | Node.js, Express 5 |
| Database | PostgreSQL (pg) |
| Authentication | JSON Web Tokens, bcrypt |
| Image storage | Cloudinary, Multer |
| UI and charts | Framer Motion, Lucide React, Recharts |

## Repository Structure

    cafe-saas-system/
    ├── backend/
    │   ├── server.js
    │   ├── package.json
    │   └── src/
    │       ├── config/        # PostgreSQL and Cloudinary configuration
    │       ├── controllers/   # Request handlers
    │       ├── middleware/    # Authentication and error handling
    │       ├── routes/        # API route definitions
    │       └── services/      # Application and database operations
    └── frontend/
        └── vite-project/
            ├── public/
            ├── src/
            │   ├── api/
            │   ├── assets/
            │   ├── components/
            │   ├── contexts/
            │   ├── hooks/
            │   ├── layouts/
            │   └── pages/
            └── package.json

## Getting Started

You need Node.js and npm installed, plus access to a PostgreSQL database and a Cloudinary account for image uploads.

### 1. Clone the repository

    git clone https://github.com/bek330/cafe-saas-system.git
    cd cafe-saas-system

### 2. Configure the backend

Create a **.env** file inside **backend/**:

    PORT=5000
    DATABASE_URL=your_postgresql_connection_string
    JWT_SECRET=replace_with_a_long_random_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Install dependencies and start the API:

    cd backend
    npm install
    npm run dev

The backend uses port **5000** by default. Set PORT to use a different port.

### 3. Configure the frontend

In a second terminal, create a **.env** file inside **frontend/vite-project/**:

    VITE_API_URL=http://localhost:5000

Install dependencies and start the Vite development server:

    cd frontend/vite-project
    npm install
    npm run dev

Open the local URL printed by Vite in your terminal.

### 4. Production build

From **frontend/vite-project/**:

    npm run build
    npm run preview

## Backend API

The Express application mounts these route groups:

| Route prefix | Purpose |
| --- | --- |
| /auth | Authentication |
| /categories | Menu category operations |
| /menu | Menu item operations |
| /orders | Order creation, status updates, and history |
| /users | User operations |
| /upload | Image uploads |
| /admin/dashboard | Dashboard reporting |

For request details and access requirements, see the route files in **backend/src/routes/**.

## Security Notes

- Keep backend credentials in environment variables. Do not commit real database passwords, JWT secrets, or Cloudinary credentials.
- Use a strong, unique JWT_SECRET in every deployed environment.
- Review authorization on every administrative endpoint before deploying publicly. Authentication and role checks are currently applied selectively in the route definitions.

## Project Status

This repository contains the frontend and backend source code. Setup instructions are provided for local development; configure your own database, Cloudinary account, and deployment environment before running the application.

## Author

**Bereketab Zena Fiseha**

- GitHub: [@bek330](https://github.com/bek330)
- Email: [bereketabzenafiseha@gmail.com](mailto:bereketabzenafiseha@gmail.com)
