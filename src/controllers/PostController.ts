import { Post } from "@models/Post";
import { Request, Response } from "express";

export class PostController {
  static async findAll(req: Request, res: Response) {
    const files = await Post.find();

    return res.json(files);
  }

  static async create(req: Request, res: Response) {
    const file: any = req.file;

    const { originalname: name, size, key, location: url = "" } = file;

    const post = await Post.create({
      name,
      size,
      key,
      url,
    });

    return res.json(post);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const post = await Post.findById(id);

    await post?.remove();

    return res.end();
  }
}
