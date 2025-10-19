"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cropController_1 = require("../controllers/cropController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.authenticate, authMiddleware_1.isFarmer, cropController_1.createCrop);
exports.default = router;
//# sourceMappingURL=cropRoutes.js.map