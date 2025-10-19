"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLivestock = void 0;
const express_1 = require("express");
const createLivestock = async (req, res) => {
    const prisma = req.prisma;
    const userId = req.user.id;
    const { animalType, breed, quantity, avgWeight, weightUnit, ageMonths, healthStatus, purchaseDate, purchasePrice, location, notes, imageUrls } = req.body;
    const livestock = await prisma.livestock.create({
        data: {
            userId,
            animalType,
            breed,
            quantity,
            avgWeight,
            weightUnit,
            ageMonths,
            healthStatus,
            purchaseDate: purchaseDate ? new Date(purchaseDate) : undefined,
            purchasePrice,
            location,
            notes,
            imageUrls,
        },
    });
    if (purchasePrice > 0) {
        await prisma.listing.create({
            data: {
                name: animalType,
                category: 'Livestock',
                price: `$${purchasePrice} / head`,
                image: imageUrls[0] || '',
                userId,
                livestockId: livestock.id,
            },
        });
    }
    await prisma.activity.create({
        data: {
            userId,
            description: `${quantity} ${animalType} added to inventory`,
        },
    });
    res.json(livestock);
};
exports.createLivestock = createLivestock;
//# sourceMappingURL=livestockController.js.map