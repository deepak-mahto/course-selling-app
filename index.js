require("dotenv").config();
const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  await mongoose.connect(process.env.CONNECTION_STRING);
  app.listen(port, () => {
    console.log(`App listening at port ${3000}`);
  });
}
main();
