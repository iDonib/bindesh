const swaggerAutogen = require("swagger-autogen")();
const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: "localhost:5000/orgFeeder/api",
  schemes: ["http"],
  
};
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./main.route.js"];
swaggerAutogen(outputFile, endpointsFiles, doc);
