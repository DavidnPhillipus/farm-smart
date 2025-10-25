# FarmSmart - Quick Start Guide

Get FarmSmart running in 5 minutes!

## Prerequisites

- Node.js v16+
- PostgreSQL
- Git

## Step 1: Clone & Install

```bash
git clone <repository-url>
cd FarmSmart

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

## Step 2: Setup Database

```bash
# Create database
createdb farmsmart

# Create .env file in server/ directory
# Add these lines:
DATABASE_URL="postgresql://username:password@localhost:5432/farmsmart"
JWT_SECRET="your-secret-key-here"
PORT=8080
```

Replace `username` and `password` with your PostgreSQL credentials.

## Step 3: Run Migrations

```bash
cd server
npx prisma migrate dev
```

## Step 4: Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Backend runs on: http://localhost:8080

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Frontend runs on: http://localhost:5174

## Step 5: Access the Application

Open your browser and go to: http://localhost:5174

## First Time Setup

1. Click "Register" on the landing page
2. Choose your role: Farmer or Buyer
3. Fill in your details (use "David Phillipus" as example name)
4. Click "Register"
5. You'll be logged in automatically

## For Farmers

1. Go to Dashboard
2. Click "Add New Crop" or "Add New Livestock"
3. Fill in product details
4. Add image URL (external image link)
5. Set price and quantity
6. Click "Save"
7. Your product appears in marketplace
8. Receive notifications when buyers order

## For Buyers

1. Go to Dashboard
2. Browse available listings
3. Use search and filters to find products
4. Click "Add to Cart"
5. Go to Cart page
6. Click "Checkout"
7. Order is placed and farmers are notified
8. View your orders in "Orders" page

## Common Commands

### Server
```bash
npm run dev        # Development mode
npm run build      # Build TypeScript
npm start          # Run production build
```

### Client
```bash
npm run dev        # Development server
npm run build      # Build for production
npm run preview    # Preview production build
```

### Database
```bash
npx prisma studio              # Open GUI
npx prisma migrate reset       # Reset database
npx prisma migrate dev         # Create migration
```

## Troubleshooting

### Port Already in Use
- Backend: Change PORT in .env
- Frontend: Vite uses next available port

### Database Connection Error
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Ensure database exists

### Can't Login
- Check backend is running on port 8080
- Verify database migrations ran
- Check browser console for errors

## API Base URL

All API calls go to: http://localhost:8080/api

Example:
```javascript
fetch('http://localhost:8080/api/listings')
```

## Default Ports

- Frontend: 5174
- Backend: 8080
- PostgreSQL: 5432

## File Structure

```
FarmSmart/
├── client/          # React frontend
├── server/          # Express backend
├── README.md        # Full documentation
└── QUICK_START.md   # This file
```

## Next Steps

1. Read the full README.md for detailed documentation
2. Check API endpoints in README.md
3. Explore the database schema
4. Add your own data
5. Deploy to production

## Support

For detailed information, see README.md

For issues:
1. Check Troubleshooting section in README.md
2. Verify all prerequisites are installed
3. Check that both servers are running
4. Review browser console for errors

## Production Deployment

1. Build both applications
2. Set production environment variables
3. Use a production database
4. Deploy backend to server
5. Deploy frontend to CDN or server
6. Update API URLs for production

---

Happy farming with FarmSmart!

