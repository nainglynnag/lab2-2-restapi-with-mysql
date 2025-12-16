const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

const studentRoutes = require("./routes/students");

app.get("/api", (req, res) => {
  res.send("Welcome to the Student API");
});

app.use("/api/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
