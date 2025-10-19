"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListings = void 0;
const getListings = async (req, res) => {
    const prisma = req.prisma;
    const { searchTerm, category } = req.query;
    const where = {};
    if (searchTerm)
        where.name = { contains: searchTerm, mode: "insensitive" };
    if (category && category !== "All")
        where.category = category;
    const listings = await prisma.listing.findMany({ where });
    res.json(listings);
};
exports.getListings = getListings;
//# sourceMappingURL=listingController.js.map