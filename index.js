const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();

// morgan for logging
app.use(morgan("dev"));

// Database
require("./config/database");
app.use(express.json());
// cors
const corsOption = {
  origin: ["http://localhost:5173"],
};
app.use(require("cors")(corsOption));
// Routes
const routers = require("./main.route");
app.use("/orgFeeder/api", routers);

// Error handler
const port = process.env.Port || 8000;
if (process.env.NODE_ENV !== "test")
  app.listen(port, () => console.log(`Node server started at port ${port}`));

module.exports = { app };
