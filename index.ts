import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { initializeQueue, stopQueueGracefully } from './queue/queue.js';

import usersRouter from "./routes/users-router.js";
import articleRouter from "./routes/article-router.js";
import documentRouter from "./routes/document-router.js";
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
app.use("/api/v1", articleRouter);
app.use("/api/v1", documentRouter);
// app.use("/api/v1", contactRouter);

initializeQueue()

app.listen(process.env.PORT || apiPort, () => {
  console.log(`Server running on port ${apiPort}`);
  console.log("");
});

const shutdownHandler = async () => {
  await stopQueueGracefully();
}

process.on('SIGTERM', shutdownHandler)
process.on('beforeExit', shutdownHandler)
