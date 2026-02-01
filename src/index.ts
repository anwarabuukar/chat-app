import app from "../server.js";
import { serverPort } from "./config/index.js";

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});
