"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuyerStats = exports.getFarmerStats = void 0;
const express_1 = require("express");
const getFarmerStats = async (req, res) => {
    const prisma = req.prisma;
    const userId = req.user.id;
    const totalProduce = await prisma.crop.count({ where: { userId } }) + await prisma.livestock.count({ where: { userId } });
    const activeListings = await prisma.listing.count({ where: { userId } });
    const pendingOrders = await prisma.order.count({ where: { listing: { userId }, status: 'pending' } });
    const revenue = await prisma.order.aggregate({
        where: { listing: { userId }, status: 'delivered' },
        _sum: { quantity: true },
    });
    res.json({ totalProduce, activeListings, pendingOrders, revenue: revenue._sum.quantity || 0 });
};
exports.getFarmerStats = getFarmerStats;
const getBuyerStats = async (req, res) => {
    const prisma = req.prisma;
    const userId = req.user.id;
    const totalPurchases = await prisma.order.count({ where: { userId } });
    const pendingOrders = await prisma.order.count({ where: { userId, status: 'pending' } });
    const itemsInCart = await prisma.cartItem.count({ where: { userId } });
    const totalSpent = await prisma.order.aggregate({
        where: { userId, status: 'delivered' },
        _sum: { quantity: true },
    });
    res.json({ totalPurchases, pendingOrders, itemsInCart, totalSpent: totalSpent._sum.quantity || 0 });
};
exports.getBuyerStats = getBuyerStats;
//# sourceMappingURL=statsController.js.map