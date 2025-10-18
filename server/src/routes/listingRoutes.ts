import express from "express";
import { getListings } from "../controllers/listingController.js";
import { authenticate, isBuyer } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, isBuyer, getListings);

export default router;
