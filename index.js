const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Student = require("./model/student");
const studentController = require("./controller/studentController");

mongoose.connect("mongodb://localhost:27017/Students", {
  useNewUrlParser: "true",
});
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Student API");
});

app.get("/students", studentController.getStudents);
app.get("/students/:id", studentController.getStudentById);
app.post("/students", studentController.createStudent);
app.put("/students/:id", studentController.updateStudent);
app.delete("/students/:id", studentController.deleteStudent);

app.use((req, res) => {
  res.status(404).json({ error: "Invalid route" });
});

app.listen(3000);
