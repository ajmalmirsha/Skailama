const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const { authenticate } = require("./Middlewares/Authentication");

const app = express();

const port = 3000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("connected to database");
});

const allowedOrigins = [process.env.BASE_URL, "http://localhost:5173", "*"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);

app.use(express.json());

app.use("/auth", require("./router/Auth"));

app.use(authenticate);

app.use("/project", require("./router/Project"));
app.use("/episode", require("./router/Episode"));

app.listen(port, () => {
  console.log(`server started listening to ${port} port`);
});
