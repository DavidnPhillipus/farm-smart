# FarmSmart- FarmManagement & Marketplace Platform

FarmSmart is a comprehensive farm management and marketplace platform that helps farmers organize their produce and livestock, manage their farms efficiently, and connect with buyers while providing buyers with a trusted way to find quality products directly from farms.

## Features

### For Farmers
- Track crops and livestock in real time
- Monitor harvests, stock levels, and sales
- Access insights to optimize production
- Digital farm record management
- Inventory tracking and management

### For Buyers
- Browse and buy farm products easily
- Filter by product type, category, and price
- Connect directly with local farmers
- Transparent buyer-seller relationships

### General Features
- Secure accounts and real-time dashboards
- Modern responsive design accessible on all devices
- Seamless transactions and records
- Data-driven insights for better decisions

##  Project Structure

```
farm-tracker/
├── src/                          # Frontend React application
│   ├── components/               # React components
│   │   ├── FarmerDashboard.tsx   # Main farmer dashboard
│   │   ├── BuyerDashboard.tsx    # Buyer interface
│   │   ├── AddCrop.tsx          # Add crop functionality
│   │   ├── AddLivestock.tsx     # Add livestock functionality
│   │   ├── Inventory.tsx        # Inventory management
│   │   └── LandingPage.tsx      # Landing page
│   └── assets/                  # Static assets
├── backend/                     # Backend Node.js/Express server
│   ├── controllers/             # API controllers
│   │   ├── cropController.ts    # Crop management APIs
│   │   ├── livestockController.ts # Livestock APIs
│   │   ├── authController.ts    # Authentication
│   │   └── InventoryController.ts # Inventory APIs
│   └── src/                    # Backend source code
│       ├── app.js              # Main server file
│       └── prisma.ts           # Database configuration
└── public/                     # Static files
```

##  Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FarmingWad
   ```

2. **Install frontend dependencies**
   ```bash
   cd farm-tracker
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Set up the database**
   - Create a PostgreSQL database
   - Update the database connection string in `backend/src/prisma.ts`

5. **Run database migrations**
   ```bash
   cd backend
   npx prisma migrate dev
   ```

### Development

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   cd farm-tracker
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 🛠️ Technologies Used

### Frontend
- React 19.1.1
- TypeScript
- Vite
- React Icons
- CSS3

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

##  How It Works

1. **Register** your account as a Farmer or Buyer
2. **Farmers** add products or livestock with detailed information
3. **Buyers** browse listings and make purchases
4. **Track** your sales and farm progress via the dashboard

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Built for farmers and agriculture**
