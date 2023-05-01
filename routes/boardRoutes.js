const express = require("express");
const { updateBoard } = require("../controller/boardController");

const boardRoute = express.Router();

// update board
boardRoute.patch("/update-board/:id", updateBoard);

module.exports = boardRoute;
