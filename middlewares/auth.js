const User = require("../models/user");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req,res,next) => {
    
  const {token} = req.cookies;

//   console.log(token);

  if(!token){
    return res.status(404).json({
      success: false,
      message: "Login first"
    })
  }

  const decoded = jwt.verify(token, "kjasfjkfakjlsfdjkfa");
  // const decoded = jwt.verify(token, process.env.SECRET);


  req.user = await User.findById(decoded._id);
  next();
}

module.exports = isAuthenticated