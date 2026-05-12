import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/database.js";
import generateInterviewReport from "./services/ai.service.js";
import { resume, selfDescription, jobDescription } from "./services/temp.js";

const PORT = process.env.PORT || 3000;

connectDB().then(async () => {
  const result = await generateInterviewReport({ resume, selfDescription, jobDescription });
  console.dir(result, { depth: null });
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
