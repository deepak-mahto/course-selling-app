require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import adminRouter from "./routes/admin";
import userRouter from "./routes/user";
import courseRouter from "./routes/course";

const app = express();
const port = process.env.PORT;
const dbConnString = process.env.CONNECTION_STRING;

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  await mongoose.connect(dbConnString as string);
  app.listen(port, () => {
    console.log(`App listening at port ${port}`);
  });
}
main();
