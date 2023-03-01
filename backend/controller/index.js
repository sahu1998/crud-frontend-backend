require("dotenv").config();

const { postData, getData, deleteData, putData } = require("../Modal");

const getController = async (req, res) => {
  const result = await getData(req.query.id);
  res.send(result);
};

const postController = async (req, res) => {
  const result = await postData(req.body);
  res.send(result);
};

const deleteController = async (req, res) => {
  console.log(req.params);
  const result = await deleteData(req.params.id);
  res.send(result);
};

const putController = async (req, res) => {
  console.log("params:====", req.params);
  console.log("putController body:----", req.body);
  const result = await putData(req.params.id, req.body);
  res.send(result);
};

module.exports = {
  getController,
  postController,
  deleteController,
  putController,
};
