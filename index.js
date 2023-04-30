const express = require("express");

const app = express();
const morgan = require("morgan");
// swagger
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");

require("dotenv").config();
// morgan for logging
app.use(morgan("dev"));
require("./config/database");
app.use(express.json());

// Routes
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const organizationRoute = require("./routes/organizationRoute");
const feedbackRouter = require("./routes/feedbackRoute");

app.use("/api/admin", adminRoute);

app.use("/api/user", userRoute);
app.use("/api/organization", organizationRoute);

// app.use("/api/feedback", feedbackRouter);

// swagger implementation
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Feedback API",
      version: "1.0.0",
      description: "A simple Express Feedback API",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerjsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(specs));
// Error handler
const port = process.env.Port || 5000;
if (process.env.NODE.ENV !== "test")
  app.listen(port, () => console.log(`Node server started at port ${port}`));

module.exports = { app };
