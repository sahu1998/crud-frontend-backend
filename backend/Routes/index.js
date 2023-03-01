const express = require("express");
const {
  getController,
  postController,
  deleteController,
  putController,
} = require("../controller");

const route = express.Router();

route.get("/", getController);

route.post("/", postController);

route.delete("/:id", deleteController);

route.put("/:id", putController);

module.exports = { route };
