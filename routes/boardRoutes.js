const express = require("express");
const { createBoard, updateBoard } = require("../controller/boardController");
const { isLoggedIn } = require("../middleware/auth");

const boardRoute = express.Router();

// create board
boardRoute.post("/create-board", isLoggedIn, createBoard);
// update board
boardRoute.patch("/update-board/:id", updateBoard);

module.exports = boardRoute;
