import { Router } from "express";

import postRoutes from "@routes/post.routes";

const app = Router();

app.use("/post", postRoutes);

export default app;
