const express = require("express");
const session = require("express-session");

const app = express();
const morgan = require("morgan");

require("dotenv").config();
// morgan for logging
app.use(morgan("dev"));
require("./config/database");
app.use(express.json());

//session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
const userRoute = require("./routes/userRoute");

app.use("/api/user", userRoute);
// Error handler
const port = process.env.Port || 5000;
if (process.env.NODE.ENV !== "test")
  app.listen(port, () => console.log(`Node server started at port ${port}`));

module.exports = { app };
