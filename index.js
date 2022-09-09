const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const { ObjectId } = require("mongodb");
const { connectToServer, main } = require("./utilis/dbconnect");

/* name change router */
const userRouter = require("./routes/v1/user.route");
const { router: adminRouter } = require("./routes/v1/admin.route");

/* mongoose connect */
/* const mongoose = require("mongoose");
main(); */
/* mongoose connect */

connectToServer((err) => {
  if (!err) {
    app.listen(5000, () => {
      console.log("Server is successfull connect");
    });
  }
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
