import multer from 'multer';
import AWS from 'aws-sdk';
import { AmazonS3Config } from '../config/config';


// Multer setup to handle file uploads
export const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB
    },
    fileFilter: (req, file, cb) => {
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type.'));
      }
    },
  });

//Amazon S3 client
export const s3 = new AWS.S3(AmazonS3Config);
