"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePresignedUrl = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const generatePresignedUrl = (fileName, fileType) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        Expires: 60 * 5,
        ContentType: fileType,
        ACL: 'public-read',
    };
    return s3.getSignedUrlPromise('putObject', params);
};
exports.generatePresignedUrl = generatePresignedUrl;
//# sourceMappingURL=s3Service.js.map