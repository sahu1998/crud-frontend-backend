const mongoose = require("mongoose");
require("../dbconnection");

const contactSchema = mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  contact: String,
});

const contactModal = mongoose.model("friends", contactSchema);

const getData = async (id = null) => {
  try {
    const response = id
      ? await contactModal.findById(id)
      : await contactModal.find();
    return { response, message: "success", status: 200 };
  } catch (error) {
    return { response: error, message: "error", status: 400 };
  }
};

const postData = async (values) => {
  console.log("post data: ", values);
  try {
    const response = await contactModal.create(values);
    return { response, message: "success", status: 200 };
  } catch (error) {
    return { response: error, message: "error", status: 400 };
  }
};

const deleteData = async (id) => {
  try {
    const response = await contactModal.findByIdAndDelete(id);
    return { response, message: "success", status: 200 };
  } catch (error) {
    return { response: error, message: "error", status: 400 };
  }
};

const putData = async (id, values) => {
  console.log("put:----- ", values);
  try {
    const response = await contactModal.findByIdAndUpdate(id, values);
    return { response, message: "success", status: 200 };
  } catch (error) {
    return { response: error, message: "error", status: 400 };
  }
};
module.exports = {
  postData,
  getData,
  deleteData,
  putData,
};
