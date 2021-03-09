import { multerConfig } from "@configs/MulterConfig";
import { FileController } from "@controllers/FileController";
import { Router } from "express";
import multer from "multer";

const app = Router();

app.get("/", FileController.findAll);
app.post("/", multer(multerConfig).single("file"), FileController.create);

export default app;
