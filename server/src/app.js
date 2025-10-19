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
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const inventoryRoutes_1 = __importDefault(require("./routes/inventoryRoutes"));
const notificationRoutes_1 = __importDefault(require("./routes/notificationRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Attach prisma to req
app.use((req, res, next) => {
    req.prisma = prisma;
    next();
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
app.use('/api/upload', uploadRoutes_1.default);
app.use('/api/inventory', inventoryRoutes_1.default);
app.use('/api/notifications', notificationRoutes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=app.js.map