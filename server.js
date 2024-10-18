const express = require("express");
const morgan = require("morgan");
const { Students } = require("./models");

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.post("/api/v1/students", async (req, res) => {
  const newStudent = req.body;
  console.log(newStudent)
  try {
    await Students.create(newStudent);
    res.status(200).json({
      status: "Success",
      message: "Application passed healthcheck",
      isSucces: true,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message,
      isSucces: false,
    });
  }
});

app.get("/api/v1/students", async (req, res) => {
    try {
    const students = await Students.findAll();
        res.status(200).json({
            status: "Success",
            message: "Application passed healtcheck",
            isSuccess: true,
            data: {
                students
            }
        })
    } catch(error) {
        res.status(500).json({
            status: "Fail",
            message: error.message,
            isSuccess: false
        })
    }
})

app.get("/api/v1/health-check", async (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      message: "Application passed healthcheck",
      isSucces: true,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: "Application failed healthcheck",
      isSucces: false,
    });
  }
});

module.exports = app;
