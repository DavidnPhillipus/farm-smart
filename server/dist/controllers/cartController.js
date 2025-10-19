"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCart = exports.updateQuantity = exports.addToCart = exports.getCart = void 0;
const getCart = async (req, res) => {
    const prisma = req.prisma;
    const userId = req.user.id;
    const cartItems = await prisma.cartItem.findMany({
        where: { userId },
        include: { listing: true },
    });
    res.json(cartItems);
};
exports.getCart = getCart;
const addToCart = async (req, res) => {
    const prisma = req.prisma;
    const userId = req.user.id;
    const { listingId, quantity } = req.body;
    const cartItem = await prisma.cartItem.upsert({
        where: { userId_listingId: { userId, listingId } },
        update: { quantity: { increment: quantity || 1 } },
        create: { userId, listingId, quantity: quantity || 1 },
    });
    res.json(cartItem);
};
exports.addToCart = addToCart;
const updateQuantity = async (req, res) => {
    const prisma = req.prisma;
    const id = parseInt(req.params.id);
    const { delta } = req.body;
    const cartItem = await prisma.cartItem.update({
        where: { id },
        data: { quantity: { increment: delta } },
    });
    if (cartItem.quantity < 1)
        await prisma.cartItem.delete({ where: { id } });
    res.json(cartItem);
};
exports.updateQuantity = updateQuantity;
const removeFromCart = async (req, res) => {
    const prisma = req.prisma;
    const id = parseInt(req.params.id);
    await prisma.cartItem.delete({ where: { id } });
    res.json({ message: 'Removed' });
};
exports.removeFromCart = removeFromCart;
//# sourceMappingURL=cartController.js.map