"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const listingController_js_1 = require("../controllers/listingController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const router = express_1.default.Router();
router.get("/", authMiddleware_js_1.authenticate, authMiddleware_js_1.isBuyer, listingController_js_1.getListings);
exports.default = router;
//# sourceMappingURL=listingRoutes.js.map