"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markNotificationRead = exports.getNotifications = void 0;
const getNotifications = async (req, res) => {
    const prisma = req.prisma;
    const userId = req.user.id;
    const notifications = await prisma.activity.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    });
    res.json(notifications);
};
exports.getNotifications = getNotifications;
const markNotificationRead = async (req, res) => {
    const prisma = req.prisma;
    const id = parseInt(req.params.id || '0');
    const userId = req.user.id;
    const notification = await prisma.activity.findUnique({
        where: { id, userId },
    });
    if (!notification)
        return res.status(404).json({ message: 'Notification not found' });
    await prisma.activity.update({
        where: { id },
        data: { read: true },
    });
    res.json({ message: 'Marked as read' });
};
exports.markNotificationRead = markNotificationRead;
//# sourceMappingURL=notificationController.js.map