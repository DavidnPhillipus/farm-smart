# FarmSmart - Farm Management & Marketplace Platform

FarmSmart is an intelligent farm management and marketplace platform designed to simplify agriculture. It helps farmers organize their produce and livestock, manage their farms efficiently, and reach the right buyers while giving buyers a trusted, transparent way to find quality products directly from farms.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [User Roles](#user-roles)
- [Troubleshooting](#troubleshooting)

## Features

### For Farmers
- Track crops and livestock in real time
- Monitor harvests, stock levels, and sales
- Access insights to optimize production
- Manage product listings with images
- Receive notifications for new orders
- View recent activity and sales

### For Buyers
- Browse and buy farm products easily
- Filter by product type, category, and price
- Connect directly with local farmers
- Add items to cart and checkout
- Track order history
- View purchase statistics

## Tech Stack

### Frontend
- React 19.1.1
- TypeScript
- Vite (build tool)
- React Router v7
- React Icons
- CSS3 with CSS Variables

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcryptjs for password hashing

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (v12 or higher)
- Git

## Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd FarmSmart
```

### Step 2: Install Server Dependencies

```bash
cd server
npm install
```

### Step 3: Install Client Dependencies

```bash
cd ../client
npm install
```

## Configuration

### Step 1: Create PostgreSQL Database

```bash
createdb farmsmart
```

### Step 2: Create Environment Variables

Create a `.env` file in the `server` directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/farmsmart"
JWT_SECRET="your-secret-key-here-change-this"
PORT=8080
```

Replace `username` and `password` with your PostgreSQL credentials.

### Step 3: Run Prisma Migrations

```bash
cd server
npx prisma migrate dev
```

This will:
- Create all database tables
- Generate Prisma client
- Set up the database schema

## Running the Application

### Option 1: Development Mode (Recommended)

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```
Backend runs on: http://localhost:8080

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```
Frontend runs on: http://localhost:5174

### Option 2: Production Build

**Build Backend:**
```bash
cd server
npm run build
npm start
```

**Build Frontend:**
```bash
cd client
npm run build
npm run preview
```

## Project Structure

```
FarmSmart/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/             # React components
│   │   │   ├── LandingPage.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── FarmerDashboard.tsx
│   │   │   ├── BuyerDashboard.tsx
│   │   │   ├── AddCrop.tsx
│   │   │   ├── AddLivestock.tsx
│   │   │   ├── CartPage.tsx
│   │   │   ├── OrdersPage.tsx
│   │   │   ├── Notifications.tsx
│   │   │   └── InventoryDashboard.tsx
│   │   ├── context/                # Auth context
│   │   ├── assets/                 # Images
│   │   ├── styles/                 # Global CSS
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── server/                          # Express backend
│   ├── src/
│   │   ├── controllers/            # Route handlers
│   │   │   ├── authController.ts
│   │   │   ├── cropController.ts
│   │   │   ├── livestockController.ts
│   │   │   ├── listingController.ts
│   │   │   ├── cartController.ts
│   │   │   ├── orderController.ts
│   │   │   └── notificationController.ts
│   │   ├── routes/                 # API routes
│   │   ├── middleware/             # Auth middleware
│   │   ├── utils/                  # JWT utilities
│   │   └── app.ts
│   ├── prisma/
│   │   └── schema.prisma           # Database schema
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (farmer or buyer)
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Crops (Farmer Only)
- `POST /api/crops` - Create new crop
- `GET /api/crops` - Get farmer's crops
- `PUT /api/crops/:id` - Update crop
- `DELETE /api/crops/:id` - Delete crop

### Livestock (Farmer Only)
- `POST /api/livestock` - Create new livestock
- `GET /api/livestock` - Get farmer's livestock
- `PUT /api/livestock/:id` - Update livestock
- `DELETE /api/livestock/:id` - Delete livestock

### Listings (Marketplace)
- `GET /api/listings` - Get all listings with filters (searchTerm, category)
- `GET /api/listings/:id` - Get listing details

### Cart (Buyer Only)
- `GET /api/cart` - Get cart items
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `POST /api/orders/checkout` - Create order from cart
- `GET /api/orders` - Get user's orders

### Notifications (Farmer Only)
- `GET /api/notifications` - Get farmer's notifications
- `PATCH /api/notifications/:id/read` - Mark notification as read

### Stats
- `GET /api/stats/farmer` - Get farmer dashboard stats
- `GET /api/stats/buyer` - Get buyer dashboard stats

## Database Schema

### Users Table
```
- id (Primary Key)
- name (String)
- email (String, Unique)
- password (String, Hashed)
- role (FARMER or BUYER)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### Crops Table
```
- id (Primary Key)
- userId (Foreign Key)
- name (String)
- variety (String)
- quantity (Integer)
- unit (String: kg, tons, etc)
- harvestDate (DateTime)
- price (Decimal)
- category (String)
- location (String)
- description (Text)
- imageUrls (JSON Array)
- createdAt (DateTime)
```

### Livestock Table
```
- id (Primary Key)
- userId (Foreign Key)
- name (String)
- breed (String)
- quantity (Integer)
- unit (String)
- price (Decimal)
- category (String)
- location (String)
- description (Text)
- imageUrls (JSON Array)
- createdAt (DateTime)
```

### Listings Table
```
- id (Primary Key)
- userId (Foreign Key)
- cropId (Foreign Key, nullable)
- livestockId (Foreign Key, nullable)
- name (String)
- category (String)
- price (String)
- image (String)
```

### CartItems Table
```
- id (Primary Key)
- userId (Foreign Key)
- listingId (Foreign Key)
- quantity (Integer)
```

### Orders Table
```
- id (Primary Key)
- userId (Foreign Key)
- listingId (Foreign Key)
- quantity (Integer)
- status (String: pending, delivered)
- createdAt (DateTime)
```

### Activity (Notifications) Table
```
- id (Primary Key)
- userId (Foreign Key)
- description (String)
- read (Boolean)
- createdAt (DateTime)
```

## User Roles

### Farmer
- Register with farmer role
- Add crops and livestock with details
- Create listings with prices
- View orders received
- Receive notifications when items are ordered
- Track inventory levels
- View sales statistics

### Buyer
- Register with buyer role
- Browse all available listings
- Filter by category and search
- Add items to cart
- Checkout and place orders
- View order history
- Track purchase statistics

## Development Commands

### Server Commands
```bash
npm run build      # Compile TypeScript
npm run dev        # Run in development mode
npm start          # Run compiled version
```

### Client Commands
```bash
npm run build      # Build for production
npm run dev        # Run development server
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Database Commands
```bash
npx prisma studio              # Open Prisma Studio GUI
npx prisma migrate dev         # Create and apply migrations
npx prisma migrate reset       # Reset database (removes all data)
npx prisma generate           # Generate Prisma client
```

## Troubleshooting

### Database Connection Error
**Problem:** Cannot connect to PostgreSQL
**Solution:**
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env file
- Verify database exists: `psql -l`
- Check username and password

### Port Already in Use
**Problem:** Port 8080 or 5174 is already in use
**Solution:**
- Backend: Change PORT in .env file
- Frontend: Vite will automatically use next available port

### CORS Issues
**Problem:** Frontend cannot communicate with backend
**Solution:**
- Ensure backend is running on http://localhost:8080
- Check proxy settings in client/vite.config.ts
- Verify API calls use correct base URL

### Prisma Client Not Generated
**Problem:** Prisma client errors
**Solution:**
```bash
cd server
npx prisma generate
```

### Migration Issues
**Problem:** Database migration fails
**Solution:**
```bash
cd server
npx prisma migrate reset --force
npx prisma migrate dev
```

## Features Overview

### Authentication
- Secure JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control

### Farmer Dashboard
- Real-time statistics (total produce, active listings, pending orders, revenue)
- Recent activity feed
- Quick actions to add crops/livestock

### Buyer Dashboard
- Purchase statistics
- Available listings with filters
- Shopping cart functionality
- Order tracking

### Notifications System
- Real-time order notifications for farmers
- Notification read/unread status
- Activity history

### Order Management
- Transaction-based order creation
- Automatic inventory updates
- Order status tracking

## Performance Optimizations

- CSS duplication reduced by 94.4%
- Optimized bundle size
- Efficient database queries with Prisma
- JWT token-based authentication
- Responsive design for all devices

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected API routes
- Role-based access control
- Secure database transactions

## Support & Contributing

For issues or questions:
1. Check the Troubleshooting section
2. Review API documentation
3. Check database schema

## License

This project is licensed under the MIT License.

---

**Built for farmers and agriculture - Empowering farms with smart technology**
