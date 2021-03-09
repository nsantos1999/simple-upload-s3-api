import { File } from "@models/File";
import { Request, Response } from "express";

export class FileController {
  static async findAll(req: Request, res: Response) {
    const files = await File.find();

    return res.json(files);
  }

  static async create(req: Request, res: Response) {
    const file: any = req.file;

    const { originalname: name, size, key, location: url = "" } = file;

    const fileCreated = await File.create({
      name,
      size,
      key,
      url,
    });

    return res.json(fileCreated);
  }
}
