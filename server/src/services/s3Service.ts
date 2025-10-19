import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY || '',
  secretAccessKey: process.env.SECRET_KEY || '',
  region: process.env.BUCKET_REGION || 'eu-north-1',
});

export const generatePresignedUrl = (fileName: string, fileType: string) => {
  const params = {
    Bucket: process.env.BUCKET_NAME || 'farm-smart-bucket',
    Key: fileName,
    Expires: 60 * 5,
    ContentType: fileType,
    ACL: 'public-read',
  };

  return s3.getSignedUrlPromise('putObject', params);
};