import { Router } from "express";

import fileRoutes from "@routes/file.routes";

const app = Router();

app.use("/file", fileRoutes);

export default app;
