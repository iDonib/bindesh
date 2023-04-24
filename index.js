const express = require("express");
const morgan = require("morgan");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
<<<<<<< HEAD
// morgan for logging
app.use(morgan("dev"));
=======
const cors = require("cors");
>>>>>>> main
require("./config/database");
app.use(express.json());
<<<<<<< HEAD
// Routes
=======
app.use(morgan("tiny"));

>>>>>>> main
const userRoute = require("./routes/userRoute");
app.use("/api/user", userRoute);
// Error handler
const port = process.env.Port || 5000;
if (process.env.NODE.ENV !== "test")
  app.listen(port, () => console.log(`Node server started at port ${port}`));

module.exports = { app };
