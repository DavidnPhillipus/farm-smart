import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const generatePresignedUrl = (fileName: string, fileType: string) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Expires: 60 * 5,
    ContentType: fileType,
    ACL: 'public-read',
  };

  return s3.getSignedUrlPromise('putObject', params);
};