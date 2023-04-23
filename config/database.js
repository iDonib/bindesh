
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const db = mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
    console.log("Error connecting database!!!.");
  });

module.exports = db;