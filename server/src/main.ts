import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  deleteUrl_useCase,
  getAllUrls_useCase,
  getAnal_useCase,
  getInfo_useCase,
  redirToUrl_useCase,
  shortenUrl_useCase,
} from "./apis";

const app: Express = express();

dotenv.config();
app.use(express.json());
app.use(cors());

app.post("/shorten", shortenUrl_useCase);

app.get("/getall", getAllUrls_useCase);

app.get("/info/*", getInfo_useCase);

app.get("/analytics/*", getAnal_useCase);

app.delete("/delete/*", deleteUrl_useCase);
app.get("/*", redirToUrl_useCase);

export default app;
