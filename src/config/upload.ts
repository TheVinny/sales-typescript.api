import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  driver: process.env.STORAGE_DRIVER,
  directory: uploadFolder,
  tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(_req, file, callback) {
        const filehash = crypto.randomBytes(10).toString('hex');

        const filename = `${filehash}- ${file.originalname.replace(
          /\s/g,
          '-',
        )}`;

        callback(null, filename);
      },
    }),
  },

  config: {
    aws: {
      bucket: 'api-sales-project',
    },
  },
} as IUploadConfig;
