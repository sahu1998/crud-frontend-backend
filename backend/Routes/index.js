const express = require("express");
const {
  getController,
  postController,
  deleteController,
  putController,
  getByLimitController,
} = require("../controller");
const { contactModal } = require("../Modal");

const route = express.Router();

route.get("/get/:skip/:limit", getController);

route.get("/:skip/:limit", getByLimitController);

route.get("/size", async (req, res) => {
  try {
    const length = await contactModal.count();
    console.log("length: ", length);
    res.send({ length, status: 200 });
  } catch (error) {
    res.send({ error, status: 400 });
  }
});

route.post("/", postController);

route.delete("/:id", deleteController);

route.put("/:id", putController);

module.exports = { route };
