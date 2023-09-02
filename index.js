const express = require("express");
const cors = require("cors");

const { connection } = require("./configs/db");

const { userinfoRoutes } = require("./Routes/Userinfo.Routes");

require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Welcome");
});


app.use("/userinfo", userinfoRoutes);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connect to db");
  } catch (err) {
    console.log("Error while connecting to DB");
    console.log(err);
  }
  console.log(`Server running at ${process.env.port}`);
});
