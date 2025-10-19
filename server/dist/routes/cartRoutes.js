"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.authenticate, authMiddleware_1.isBuyer, cartController_1.getCart);
router.post('/add', authMiddleware_1.authenticate, authMiddleware_1.isBuyer, cartController_1.addToCart);
router.patch('/:id', authMiddleware_1.authenticate, authMiddleware_1.isBuyer, cartController_1.updateQuantity);
router.delete('/:id', authMiddleware_1.authenticate, authMiddleware_1.isBuyer, cartController_1.removeFromCart);
exports.default = router;
//# sourceMappingURL=cartRoutes.js.map