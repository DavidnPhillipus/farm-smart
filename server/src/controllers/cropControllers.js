"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCrop = void 0;
const express_1 = require("express");
const createCrop = async (req, res) => {
    const prisma = req.prisma;
    const userId = req.user.id;
    const { cropName, variety, quantity, unit, harvestDate, pricePerUnit, category, location, description, imageUrls, } = req.body;
    const crop = await prisma.crop.create({
        data: {
            userId,
            cropName,
            variety,
            quantity,
            unit,
            harvestDate: new Date(harvestDate),
            pricePerUnit,
            category,
            location,
            description,
            imageUrls,
        },
    });
    // Optionally create listing if price > 0 (assume listed for sale)
    if (pricePerUnit > 0) {
        await prisma.listing.create({
            data: {
                name: cropName,
                category,
                price: `$${pricePerUnit} / ${unit}`,
                image: imageUrls[0] || "",
                userId,
                cropId: crop.id,
            },
        });
    }
    // Log activity
    await prisma.activity.create({
        data: {
            userId,
            description: `${quantity}${unit} ${cropName} added to inventory`,
        },
    });
    res.json(crop);
};
exports.createCrop = createCrop;
//# sourceMappingURL=cropControllers.js.map