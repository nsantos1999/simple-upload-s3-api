import path from "path";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import crypto from "crypto";
import { Request } from "express";
import multer from "multer";

const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

const multerS3Config = multerS3({
  s3: new aws.S3(),
  bucket: process.env.BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: "public-read",
  key: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err);

      const fileName = `${hash.toString("hex")}-${file.originalname}`;

      cb(null, fileName);
    });
  },
});

const multerConfig: multer.Options = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: multerS3Config,
  limits: {
    fileSize: MAX_SIZE_TWO_MEGABYTES,
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: any, key?: string | undefined | boolean) => void
  ) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
};

export { multerConfig };
