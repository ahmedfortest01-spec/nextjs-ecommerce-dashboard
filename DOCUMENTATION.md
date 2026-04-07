# E-commerce Dashboard Documentation

This project is a Next.js-based E-commerce Dashboard with real MongoDB integration and role-based authentication.

## Features

- **Authentication**: Secure registration and login using JWT and Bcrypt.
- **Database**: Integrated with MongoDB Atlas for persistent storage of users and products.
- **Role-Based Access Control (RBAC)**:
  - **Admin**: Can manage products (Add, Edit, Delete) and view sales summaries.
  - **User**: Can browse products, manage their cart, and view their order history.
- **State Management**: Uses Zustand with persistence for the shopping cart and user sessions.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS & Lucide Icons
- **State**: Zustand

## Environment Variables

Create a `.env.local` file with the following:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and receive a JWT cookie.
- `GET /api/auth/me`: Get current user session.
- `DELETE /api/auth/me`: Logout (clears JWT cookie).

### Products
- `GET /api/products`: Fetch all products.
- `POST /api/products`: Create a new product (Admin Only).
- `GET /api/products/[id]`: Get a specific product.
- `PUT /api/products/[id]`: Update a product (Admin Only).
- `DELETE /api/products/[id]`: Delete a product (Admin Only).

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables in `.env.local`.
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the dashboard at `/dashboard`.

## Admin Access

To create an admin account, you can manually set the `role` to `'admin'` in the database for a specific user, or use the API with a role field if allowed during development.
