"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUploadUrl = void 0;
const express_1 = require("express");
const s3Service_js_1 = require("../services/s3Service.js");
const getUploadUrl = async (req, res) => {
    const { fileName, fileType } = req.body;
    try {
        const url = await (0, s3Service_js_1.generatePresignedUrl)(fileName, fileType);
        res.json({ url });
    }
    catch (err) {
        res.status(500).json({ message: 'Error generating URL' });
    }
};
exports.getUploadUrl = getUploadUrl;
//# sourceMappingURL=uploadController.js.map