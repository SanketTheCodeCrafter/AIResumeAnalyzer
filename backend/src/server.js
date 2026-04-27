import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/database.js";

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("server is running on port 3000");
  });
});
