const express = require("express");
const { isLoggedIn } = require("../middleware/auth");
const {
  createBugReport,
  updateBugReport,
  deleteBugReport,
  getAllBugReport,
  getAllBugReportByUser,
} = require("../controller/bugController");

const bugReportRoute = express.Router();

bugReportRoute.post("/create-bug-report", isLoggedIn, createBugReport);

bugReportRoute.patch("/update-bug-report/:id", updateBugReport);

bugReportRoute.delete("/delete-bug-report/:id", isLoggedIn, deleteBugReport);

bugReportRoute.get("/get-all-bug-report", getAllBugReport);

bugReportRoute.get(
  "/get-all-bug-report-by-user",
  isLoggedIn,
  getAllBugReportByUser
);

module.exports = bugReportRoute;
