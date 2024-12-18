const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3010;

app.use(cors()); 
app.use(bodyParser.json());

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Connected!");
});

app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;