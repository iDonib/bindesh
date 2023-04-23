const express = require("express");
const app = express();
require("dotenv").config();
require("./config/database");

app.use(express.json());

const userRoute = require("./routes/userRoute");
app.use("/api/user", userRoute);

const port = process.env.Port || 5000;
if (process.env.NODE.ENV !== "test")
  app.listen(port, () => console.log(`Node server started at port ${port}`));

module.exports = { app };
