const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const router = require("./routes/user.js");
const taskrouter = require("./routes/task.js");
const cookieParser = require("cookie-parser");
const cors = require("cors")
// const routes = require("./routes/user.js")
require('dotenv').config();

// Express
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods: ["GET", "POST","PUT","DELETE"],
  credentials: true,
}))

app.use("/", router);
app.use("/", taskrouter);

app.set("view engine", "ejs");


mongoose
    .connect("mongodb://localhost:27017", {
      dbName: "todo_yt",
    })
    .then(() => {
      console.log("Database Connected hogaya");
    })
    .catch(() => {
      console.log("Database Connection FAILED");
    });
  

    app.listen(3000, () => {
    console.log("Server is Connected.");
    });
