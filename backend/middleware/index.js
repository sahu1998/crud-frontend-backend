const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./storage");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage,
  // limits: 2000000,
});

const verifyUser = (req, res, next) => {
  const token = req.headers.token || req.query.token || req.body.token;
  console.log("token", token);
  if (!token) {
    res.send({
      message: "Token Required",
      login: false,
      status: 400,
    });
    return;
  }
  jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
    if (error) {
      res.send({
        message: "Invalid Token",
        login: false,
        status: 400,
        error,
      });
    } else {
      req.authorized = {
        message: "Valid Token",
        login: true,
        status: 200,
        user,
      };
      next();
    }
  });
};

module.exports = { verifyUser, upload };
