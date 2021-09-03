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

app.post("/user", async (req, res) => {
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

app.get("/user", async (req, res) => {
  try {
    const resp = await Users.find();
    console.log(resp);
    res.status(200).send(resp);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
app.patch("/user/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const resp = await Users.findByIdAndUpdate(_id, { name: "Amir Malik" });
    console.log(resp);
    res.status(200).send(resp);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
app.delete("/user/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const resp = await Users.findByIdAndDelete(_id);
    console.log(resp);
    res.status(200).send(resp);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

app.listen(3001, () => {
  console.log("server running at port 3001");
});
