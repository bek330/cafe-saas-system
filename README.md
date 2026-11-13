# QR Café Menu System

A full-stack café ordering and management application. Customers can browse a digital menu and place orders, while café administrators can manage menu content and monitor order activity.

## Features

- **Digital menu:** Browse menu items grouped by category.
- **QR-based table ordering:** Customers can access the menu and submit an order with a table number.
- **Order workflow:** Customers can create orders; administrators can review the order queue and update order statuses.
- **Menu administration:** Create, edit, enable/disable, and remove menu items.
- **Category administration:** Create, edit, and remove menu categories.
- **Admin dashboard:** View order and revenue summaries, daily revenue, category sales, popular items, and peak ordering hours.
- **Image uploads:** Upload menu and category images to Cloudinary.
- **Access control:** JWT authentication protects administrator endpoints.

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
    │       ├── config/
    │       ├── controllers/
    │       ├── middleware/
    │       ├── routes/
    │       └── services/
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

You need Node.js and npm, a PostgreSQL database, and a Cloudinary account for image uploads.

### 1. Clone the repository

    git clone https://github.com/bek330/cafe-saas-system.git
    cd cafe-saas-system

### 2. Configure the backend

Copy `backend/.env.example` to `backend/.env` and set your own values. Use a strong, random `JWT_SECRET` of at least 32 characters.

Install and start the API:

    cd backend
    npm install
    npm run dev

The API uses port `5000` by default.

### 3. Configure the frontend

Copy `frontend/vite-project/.env.example` to `frontend/vite-project/.env`. Set `VITE_API_URL` to your backend URL.

Install and start the frontend:

    cd frontend/vite-project
    npm install
    npm run dev

Open the local URL printed by Vite.

### 4. Production build

From `frontend/vite-project/`:

    npm run build
    npm run preview

## Backend API

| Route prefix | Purpose |
| --- | --- |
| `/auth` | Administrator login |
| `/categories` | Public category reads; administrator management |
| `/menu` | Public menu reads; administrator management |
| `/orders` | Public order creation; administrator order queue, updates, and history |
| `/users` | Administrator user management |
| `/upload` | Administrator image uploads |
| `/admin/dashboard` | Administrator reporting |

Protected endpoints require an `Authorization: Bearer <token>` header. JWTs expire after 12 hours.

## Security Notes

- Keep real environment files and credentials out of Git. Use the committed `.env.example` files as templates.
- Configure a unique, strong `JWT_SECRET` in every environment. The API does not use a hard-coded fallback secret.
- Administrator endpoints enforce authentication and the `admin` role on the server. Frontend route protection is only a usability layer; the API remains the security boundary.
- Customer order creation and public menu reads remain available without an administrator account.

## Project Status

The repository contains the frontend and backend source code. Configure your own database, Cloudinary account, and deployment environment before running the application.

## Author

**Bereketab Zena Fiseha**

- GitHub: [@bek330](https://github.com/bek330)
- Email: [bereketabzenafiseha@gmail.com](mailto:bereketabzenafiseha@gmail.com)
