const express = require("express");
const {
  createBoard,
  updateBoard,
  getBoardByOrgId,
} = require("../controller/boardController");

const { isLoggedIn } = require("../middleware/auth");

const boardRoute = express.Router();

// create board
boardRoute.post("/create-board", isLoggedIn, createBoard);

// update board
boardRoute.patch("/update-board/:id", updateBoard);

//get board by org id
boardRoute.get("/get-board/org/:orgId", getBoardByOrgId);

module.exports = boardRoute;
