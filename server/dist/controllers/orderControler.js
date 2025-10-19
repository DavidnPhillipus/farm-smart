"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const createOrder = async (req, res) => {
    const prisma = req.prisma;
    const userId = req.user.id;
    // Assume body has cartItems array for checkout
    const { cartItems } = req.body;
    const orders = await prisma.$transaction(cartItems.map((item) => prisma.order.create({
        data: { userId, listingId: item.listingId, quantity: item.quantity },
    })));
    // Clear cart
    await prisma.cartItem.deleteMany({ where: { userId } });
    res.json(orders);
};
exports.createOrder = createOrder;
//# sourceMappingURL=orderControler.js.map