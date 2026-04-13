import Express from "express";
import { rootRouter } from "./src/routes/root";
import { singleUserRouter } from "./src/routes/user";
const app = Express();

app.use(Express.json())
app.use("/user", singleUserRouter);
app.use("/", rootRouter);

export default app;