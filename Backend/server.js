import { config } from "dotenv";
config();

import app from "./src/app.js";

app.listen(4000, () => {
  console.log("Server is running at http://localhost:4000");
});
