const express = require("express");

const app = express();
const morgan = require("morgan");

require("dotenv").config();
// morgan for logging
app.use(morgan("dev"));
require("./config/database");
app.use(express.json());

// Routes
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const feedbackRouter = require("./routes/feedbackRoute");

app.use("/api/admin", adminRoute);

app.use("/api/user", userRoute);

// app.use("/api/feedback", feedbackRouter);
// Error handler
const port = process.env.Port || 5000;
if (process.env.NODE.ENV !== "test")
  app.listen(port, () => console.log(`Node server started at port ${port}`));

module.exports = { app };
