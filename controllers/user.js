const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const sendCookie = require("../utils/features.js")


const getallusers = async (req, res) => {
  res.json({
    success: true,
    message: "Working Successfully"
  });
  console.log("called");
};


const seeallusers = async (req, res) => {
  res.send("all users");
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
   return res.status(404).json({
      success: false,
      message: "User already exists"
    });
  } 
  else{
    const hashedpassword = await bcrypt.hash(password, 10);
    
    user = await User.create({
      name,
      email,
      password: hashedpassword
    });

    sendCookie(user,res,"Registered successfully",201);
}
};

const login = async (req, res) => {
 
    const {email , password} = req.body;

    const user = await User.findOne({email}).select("+password");

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not exists"
      });
    }

    const isMatch = await bcrypt.compare(password , user.password);
    if(!isMatch){
      return res.status(404).json({
        success: false,
        message: "Wrong password"
      });
    }
        
        sendCookie(user, res, `Welcome back ${user.name}`, 200);
      //   res.json({
      //   success: true,
      //   message: `Welcome back ${user.name}`
      //  })

  };


  const logout = async(req,res) => {
    res.status(200).cookie("token" , "" , {expires: new Date(Date.now()) , 
      sameSite: process.env.NODE_ENV === "Development" ? "lax" :"none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    })
  };
 
const getmydetails = async (req, res) => {

  res.status(200).json({
    success: true,
    user : req.user,
  })
};

module.exports = {
  getallusers,
  seeallusers,
  register,
  login,
  logout,
  getmydetails,
};