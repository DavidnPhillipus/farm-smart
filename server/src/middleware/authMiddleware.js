"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBuyer = exports.isFarmer = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = require("express");
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'No token provided' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
const isFarmer = (req, res, next) => {
    if (req.user.role !== 'FARMER')
        return res.status(403).json({ message: 'Access denied' });
    next();
};
exports.isFarmer = isFarmer;
const isBuyer = (req, res, next) => {
    if (req.user.role !== 'BUYER')
        return res.status(403).json({ message: 'Access denied' });
    next();
};
exports.isBuyer = isBuyer;
//# sourceMappingURL=authMiddleware.js.map