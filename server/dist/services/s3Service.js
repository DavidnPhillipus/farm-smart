"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePresignedUrl = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.ACCESS_KEY || '',
    secretAccessKey: process.env.SECRET_KEY || '',
    region: process.env.BUCKET_REGION || 'eu-north-1',
});
const generatePresignedUrl = (fileName, fileType) => {
    const params = {
        Bucket: process.env.BUCKET_NAME || 'farm-smart-bucket',
        Key: fileName,
        Expires: 60 * 5,
        ContentType: fileType,
        ACL: 'public-read',
    };
    return s3.getSignedUrlPromise('putObject', params);
};
exports.generatePresignedUrl = generatePresignedUrl;
//# sourceMappingURL=s3Service.js.map