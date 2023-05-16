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
app.use(cors());

const corsOption = {
  origin: [
    "https://org-feeder-front.vercel.app/"
  ],
};
// app.use(require("cors")(corsOption));

//cors policy
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (corsOption.origin.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.json({});
  }
  next();
});

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
