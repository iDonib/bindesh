const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");

// morgan for logging
app.use(morgan("dev"));

// Database
require("./config/database");
app.use(express.json());
// cors
const corsOption = {
  origin: [
    "http://localhost:5173",
    "https://org-feeder-front-n4wsnzbds-donib-irakihda.vercel.app/",
  ],
};
app.use(require("cors")(corsOption));
// Routes
const routers = require("./main.route");
app.use("/orgFeeder/api", routers);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
// Error handler
const port = process.env.Port || 8000;
if (process.env.NODE_ENV !== "test")
  app.listen(port, () => console.log(`Node server started at port ${port}`));

module.exports = { app };
