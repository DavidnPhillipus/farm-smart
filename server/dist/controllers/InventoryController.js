"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleListing = exports.getInventory = void 0;
const getInventory = async (req, res) => {
    const prisma = req.prisma;
    const userId = req.user.id;
    const crops = await prisma.crop.findMany({ where: { userId }, include: { listing: true } });
    const livestock = await prisma.livestock.findMany({ where: { userId }, include: { listing: true } });
    const inventory = [
        ...crops.map((c) => ({
            id: c.id,
            name: c.cropName,
            category: c.category,
            quantity: c.quantity,
            pricePerUnit: c.pricePerUnit,
            listed: !!c.listing,
            image: c.imageUrls[0] || '',
            type: 'crop',
        })),
        ...livestock.map((l) => ({
            id: l.id,
            name: l.animalType,
            category: 'Livestock',
            quantity: l.quantity,
            pricePerUnit: l.purchasePrice || 0,
            listed: !!l.listing,
            image: l.imageUrls[0] || '',
            type: 'livestock',
        })),
    ];
    res.json(inventory);
};
exports.getInventory = getInventory;
const toggleListing = async (req, res) => {
    const prisma = req.prisma;
    const userId = req.user.id;
    const { itemId, type, listed } = req.body;
    let item;
    if (type === 'crop') {
        item = await prisma.crop.findUnique({ where: { id: itemId, userId }, include: { listing: true } });
    }
    else if (type === 'livestock') {
        item = await prisma.livestock.findUnique({ where: { id: itemId, userId }, include: { listing: true } });
    }
    if (!item)
        return res.status(404).json({ message: 'Item not found' });
    if (listed && !item.listing) {
        const name = type === 'crop' ? item.cropName : item.animalType;
        const category = type === 'crop' ? item.category : 'Livestock';
        const pricePerUnit = type === 'crop' ? item.pricePerUnit : item.purchasePrice;
        const unit = type === 'crop' ? item.unit : 'head';
        await prisma.listing.create({
            data: {
                name,
                category,
                price: `$${pricePerUnit} / ${unit}`,
                image: item.imageUrls[0] || '',
                userId,
                ...(type === 'crop' ? { cropId: itemId } : { livestockId: itemId }),
            },
        });
    }
    else if (!listed && item.listing) {
        await prisma.listing.delete({ where: { id: item.listing.id } });
    }
    res.json({ message: 'Toggled' });
};
exports.toggleListing = toggleListing;
//# sourceMappingURL=InventoryController.js.map