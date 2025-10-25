"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
// Routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cropRoutes_1 = __importDefault(require("./routes/cropRoutes"));
const livestockRoutes_1 = __importDefault(require("./routes/livestockRoutes"));
const listingRoutes_1 = __importDefault(require("./routes/listingRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const statsRoutes_1 = __importDefault(require("./routes/statsRoutes"));
const activityRoutes_1 = __importDefault(require("./routes/activityRoutes"));
const InventoryRoute_1 = __importDefault(require("./routes/InventoryRoute"));
const notificationRoutes_1 = __importDefault(require("./routes/notificationRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
// Attach prisma to req
app.use((req, _res, next) => {
    req.prisma = prisma;
    next();
});
// Test endpoint
app.get('/api/test', (_req, res) => {
    res.json({ message: 'Server is running' });
});
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/crops', cropRoutes_1.default);
app.use('/api/livestock', livestockRoutes_1.default);
app.use('/api/listings', listingRoutes_1.default);
app.use('/api/cart', cartRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.use('/api/stats', statsRoutes_1.default);
app.use('/api/activities', activityRoutes_1.default);
app.use('/api/inventory', InventoryRoute_1.default);
app.use('/api/notifications', notificationRoutes_1.default);
// Error handling middleware
app.use((err, _req, res, _next) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=app.js.map