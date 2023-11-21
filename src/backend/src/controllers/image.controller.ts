import { Request } from "express";
import { BadRequestError } from "../common/err.common";
import path from "path";
import fs from "fs";
import logging from "../configs/logging";
export function validateAndReturnImage(req: Request): {
  data: Buffer;
  contentType: String;
} {
  if (!req.file) {
    throw new BadRequestError("No file provided", req.url);
  }

  const img = fs.readFileSync(path.join(__dirname, "..", "..", req.file.path));
  const encode_img = img.toString("base64");
  const data = Buffer.from(encode_img, "base64");

  var image = {
    data: data,
    contentType: req.file.mimetype,
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
