import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
const { prisma } = require('./db');

const usersRouter = require("./routes/users-router");
// const articleRouter = require("./routes/article-router");
// const contactRouter = require("./routes/contact-router");

const app = express();
const apiPort = 4001;

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ name: "Talent DAO API", version: "v1.0" });
});

app.use("/api/v1", usersRouter);
// app.use("/api/v1", articleRouter);
// app.use("/api/v1", contactRouter);

app.listen(process.env.PORT || apiPort, () => {
  console.log(`Server running on port ${apiPort}`);
  console.log("");
});
