import { multerConfig } from "@configs/MulterConfig";
import { PostController } from "@controllers/PostController";
import { Router } from "express";
import multer from "multer";

const app = Router();

app.get("/", PostController.findAll);
app.delete("/:id", PostController.delete);
app.post("/", multer(multerConfig).single("file"), PostController.create);

export default app;
