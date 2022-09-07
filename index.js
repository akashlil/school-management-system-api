const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
require("./routes/v1/user.route");
const { connectToServer } = require("./utilis/dbconnect");
const userRouter = require("./routes/v1/user.route");

connectToServer((err) => {
  if (!err) {
    app.listen(5000, () => {
      console.log("Server is successfull connect");
    });
  }
});

app.use("/api/v1/user", userRouter);
