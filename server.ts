import Express from "express";
import { rootRouter } from "./src/routes/root";
const app = Express();

app.use(Express.json())
app.use("/", rootRouter);

export default app;