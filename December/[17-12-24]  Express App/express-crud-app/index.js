const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorHandler");
const studentRoutes = require("./routes/studentRouter");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3010;

app.use(cors());
app.use(bodyParser.json());

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Student Management API Connected!");
});

app.use("/api/v1/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
