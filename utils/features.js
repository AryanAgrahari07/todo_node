const jwt = require("jsonwebtoken")
// const _ = require("lodash")
require('dotenv').config();

const sendCookie = (user ,res,message,statusCode = 200) => {
    // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // console.log(process.env.JWT_SECRET);
    // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    const token = jwt.sign({ _id: user._id }, "kjasfjkfakjlsfdjkfa");

    res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" :"none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
}

module.exports = sendCookie 