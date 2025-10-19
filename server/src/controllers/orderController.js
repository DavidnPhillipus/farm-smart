"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrders = exports.createOrder = void 0;
const express_1 = require("express");
const createOrder = async (req, res) => {
    const prisma = req.prisma;
    const userId = req.user.id;
    const { cartItems } = req.body;
    const orders = await prisma.$transaction(cartItems.map((item) => prisma.order.create({
        data: { userId, listingId: item.listingId, quantity: item.quantity },
    })));
    await prisma.cartItem.deleteMany({ where: { userId } });
    res.json(orders);
};
exports.createOrder = createOrder;
const getOrders = async (req, res) => {
    const prisma = req.prisma;
    const userId = req.user.id;
    const orders = await prisma.order.findMany({
        where: { userId },
        include: { listing: true },
        orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
};
exports.getOrders = getOrders;
const updateOrderStatus = async (req, res) => {
    const prisma = req.prisma;
    const id = parseInt(req.params.id);
    const order = await prisma.order.update({
        where: { id },
        data: { status: 'delivered' },
    });
    res.json(order);
};
exports.updateOrderStatus = updateOrderStatus;
//# sourceMappingURL=orderController.js.map