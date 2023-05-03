const routes = require("express").Router();

// Routes
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const organizationRoute = require("./routes/organizationRoute");

const boardRoute = require("./routes/boardRoutes");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");

routes.use("/admin", adminRoute);

routes.use("/user", userRoute);
routes.use("/organization", organizationRoute);
routes.use("/board", boardRoute);
routes.use("/post", postRoute);
routes.use("/comment", commentRoute);

module.exports = routes;
