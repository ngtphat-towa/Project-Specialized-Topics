import { Request } from "express";
import { BadRequestError } from "../common/err.common";
import path from "path";
import fs from "fs";
import logging from "../configs/logging";
import sharp from 'sharp';

export async function validateAndReturnImage(req: Request, isRequired: boolean = true) {
  if (!req.file) {
    if (isRequired) throw new BadRequestError("No file provided", req.url);
    return null;
  }

  // Read the image file
  const img = fs.readFileSync(path.join(__dirname, "..", "..", req.file.path));

  // Resize and compress the image using sharp
  const resizedImageBuffer = await sharp(img)
    .resize(500, 500, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80, progressive: true, optimizeScans: true })
    .toBuffer();

  var image = {
    data: resizedImageBuffer,
    contentType: 'image/jpeg',
  };

  fs.unlink(req.file.path, (err) => {
    if (err) {
      logging.error("IMAGE FILE", `Failed to delete file: ${err}`);
    } else {
      logging.debug("IMAGE FILE", `Deleted file: ${req?.file?.path}`);
    }
  });

  return image;
}

export function deleteImage(filePath: string): void {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Failed to delete file: ${err}`);
    } else {
      console.log(`Deleted file: ${filePath}`);
    }
  });
}
