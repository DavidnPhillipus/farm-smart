import { Request, Response } from 'express';
import { generatePresignedUrl } from '../services/s3Service';

export const getUploadUrl = async (req: Request, res: Response) => {
  const { fileName, fileType } = req.body;

  try {
    const url = await generatePresignedUrl(fileName, fileType);
    res.json({ url });
  } catch (err) {
    res.status(500).json({ message: 'Error generating URL' });
  }
};