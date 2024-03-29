const mongoose = require("mongoose");
require("../dbconnection");

const contactSchema = mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  contact: String,
});

const contactModal = mongoose.model("persons", contactSchema);

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

const getDataByQuery = async (query, skip, limit) => {
  try {
    const response = await contactModal
      .find({
        $or: [
          { name: { $regex: query } },
          { email: { $regex: query } },
          { contact: { $regex: query } },
        ],
      })
      .skip(skip)
      .limit(limit);

    const length = await contactModal
      .find({
        $or: [
          { name: { $regex: query } },
          { email: { $regex: query } },
          { contact: { $regex: query } },
        ],
      })
      .count();

    return {
      response,
      message: "success",
      status: 200,
      length,
    };
  } catch (error) {
    return { response: error, message: "error", status: 400 };
  }
};

const getDataByLimit = async (skip, limit) => {
  try {
    const response = await contactModal.find().limit(limit).skip(skip);
    const length = await contactModal.count();
    return {
      response,
      message: "success",
      status: 200,
      length,
    };
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
  getDataByLimit,
  contactModal,
  getDataByQuery,
};
