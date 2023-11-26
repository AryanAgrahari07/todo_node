const express = require("express");
const {seeallusers,register, login, getmydetails, logout} = require("../controllers/user.js");
const isAuthenticated  = require("../middlewares/auth.js");

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("start page");
});

router.get("/users", seeallusers);

router.post("/users/register", register);

router.post("/users/login", login);

router.get("/users/logout", logout);

router.get("/users/myprofile" , isAuthenticated , getmydetails);

module.exports = router;
