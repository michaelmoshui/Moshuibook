const express = require("express");
const cors = require("cors");
const app = express();
const { readdirSync } = require("fs"); // read-files modules
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

//routes

//// lesson: create new array from routes folder, along the process do app.use("/", require(that route))
readdirSync("./routes").map(function (r) {
  app.use("/", require("./routes/" + r));
});

app.get("/", function (req, res) {
  res.send("This is the home page");
});

//database

mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
  })
  .then(
    //// lesson: .then() basically allows callback functions depending on the result of previous function call...no error => do something...error => do something else
    (good) => {
      console.log("database connected successfully");
    },
    (bad) => {
      console.log("error connecting to database", bad);
    }
  );

app.listen(process.env.PORT, function () {
  console.log(`Server is running on ${process.env.PORT}`);
});
