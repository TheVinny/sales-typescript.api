import uploadConfig from '@config/upload';
import fs from 'fs';
import { S3 } from 'aws-sdk';
import path from 'path';
import mime from 'mime';

class S3StorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_REGION,
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalpath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalpath);

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalpath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalpath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
