const express = require("express");

const mongoose = require("mongoose");

const Users = require("./models/user");
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/PracticeDatabase")
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("welcome to homepage");
});

app.post("/create", async (req, res) => {
  try {
    const user = new Users(req.body);
    const resp = await user.save();
    console.log(resp);
    res.status(201).send("record inserted successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }

  //   {
  //     "name":"asim maqsood",
  //     "email":"asimmaqsood@gmail.com",
  //     "age":25,
  //     "phone":123456789

  // }
});

app.listen(3001, () => {
  console.log("server running at port 3001");
});
