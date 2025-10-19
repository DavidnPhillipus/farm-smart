"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inventoryController_1 = require("../controllers/inventoryController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.authenticate, authMiddleware_1.isFarmer, inventoryController_1.getInventory);
router.post('/toggle', authMiddleware_1.authenticate, authMiddleware_1.isFarmer, inventoryController_1.toggleListing);
exports.default = router;
//# sourceMappingURL=InventoryRoute.js.map