"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivities = void 0;
const express_1 = require("express");
const getActivities = async (req, res) => {
    const prisma = req.prisma;
    const userId = req.user.id;
    const activities = await prisma.activity.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5,
    });
    res.json(activities.map(a => a.description));
};
exports.getActivities = getActivities;
//# sourceMappingURL=activityController.js.map