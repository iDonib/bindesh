const express = require("express");
const morgan = require("morgan");
const app = express();
require("dotenv").config();
const cors = require("cors");
require("./config/database");

app.use(express.json());
app.use(morgan("tiny"));

const userRoute = require("./routes/userRoute");
app.use("/api/user", userRoute);

const port = process.env.Port || 5000;
if (process.env.NODE.ENV !== "test")
  app.listen(port, () => console.log(`Node server started at port ${port}`));

module.exports = { app };
