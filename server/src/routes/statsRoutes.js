"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const statsController_1 = require("../controllers/statsController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/farmer', authMiddleware_1.authenticate, authMiddleware_1.isFarmer, statsController_1.getFarmerStats);
router.get('/buyer', authMiddleware_1.authenticate, authMiddleware_1.isBuyer, statsController_1.getBuyerStats);
exports.default = router;
//# sourceMappingURL=statsRoutes.js.map