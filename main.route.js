const routes = require("express").Router();

// Routes
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const organizationRoute = require("./routes/organizationRoute");
const featureRequestRoute = require("./routes/featureRequestRoute");
const boardRoute = require("./routes/boardRoutes");
const bugReportRoute = require("./routes/bugReportRoute");
const feedbackRoute = require("./routes/feedbackRoute");

routes.use("/admin", adminRoute);

routes.use("/user", userRoute);
routes.use("/organization", organizationRoute);
routes.use("/board", boardRoute);

routes.use("/feature-request", featureRequestRoute);
routes.use("/bug-report", bugReportRoute);

routes.use("/feedback", feedbackRoute);

module.exports = routes;
