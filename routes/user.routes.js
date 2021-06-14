const express = require("express");
const {
  signInUser,
  getUserInfo,
  addANewUser
} = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.route("/signup")
.post(addANewUser)
userRouter.route("/login")
.post(signInUser)

module.exports = { userRouter } ;

