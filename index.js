const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");
const cors = require("cors");

const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");

// morgan for logging
app.use(morgan("dev"));

// Database
require("./config/database");
app.use(express.json());

app.use(express.static("public"));
// cors
app.use(cors());

const corsOption = {
  origin: [
    "https://localhost:5173",
    "https://org-feeder-front.vercel.app/",
    "https://orgfeeder-front.vercel.app/",
  ],
};
// app.use(require("cors")(corsOption));
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
        url: "http://localhost:5000/orgFeeder/api",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerjsdoc(options);
app.use("/orgFeeder/api-docs", swaggerui.serve, swaggerui.setup(specs));

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
const { url } = require("inspector");
app.use("/orgFeeder/api", routers);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Error handler
const port = process.env.Port || 8000;
if (process.env.NODE_ENV !== "test")
  app.listen(port, () => console.log(`Node server started at port ${port}`));

module.exports = { app };
