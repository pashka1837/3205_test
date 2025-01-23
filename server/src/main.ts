import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { checkExpired, generateUrl, saveUrl, updUrlStat } from "./utils";
import { urlMap } from "./db";
import { UrlInfoType } from "./types";

const endpoints = ["/shorten", "/info", "/delete", "/analytics"];

const app: Express = express();

dotenv.config();
app.use(express.json());
app.use(cors());

app.post("/shorten", (req, res) => {
  const { originalUrl, expiresAt, alias } = req.body;

  if (
    !originalUrl ||
    typeof originalUrl !== "string" ||
    (expiresAt && (typeof expiresAt !== "number" || expiresAt < Date.now())) ||
    (alias &&
      (typeof alias !== "string" || alias.length > 20 || urlMap.has(alias)))
  ) {
    res.status(400).json({ message: "Wrong data" });
    return;
  }

  const newUrl = generateUrl(urlMap, alias);
  saveUrl(urlMap, originalUrl, newUrl, expiresAt);

  res.json({ newUrl });
  return;
});

app.get("/getall", (req, res) => {
  const data: ({ shortenUrl: string } & UrlInfoType)[] = [];

  urlMap.forEach((val, key) => {
    data.push({
      ...val,
      shortenUrl: key,
    });
  });

  res.json({ urlMap: data });
  return;
});

app.get("/info/*", (req, res) => {
  const { url } = req;
  const shortenUrl = url.split("/")?.at(-1) || "";
  const urlObj = urlMap.get(shortenUrl);

  if (!urlObj) {
    res.status(404).json({ message: "Not Found" });
    return;
  }

  if (checkExpired(urlObj)) {
    res.status(410).json({ message: "Url Expired" });
    return;
  }

  res.json({
    originalUrl: urlObj.originalUrl,
    createdAt: urlObj.createdAt,
    clickCount: urlObj.clickCount,
  });
  return;
});

app.get("/analytics/*", (req, res) => {
  const { url } = req;
  const shortenUrl = url.split("/")?.at(-1) || "";
  const urlObj = urlMap.get(shortenUrl);

  if (!urlObj) {
    res.status(404).json({ message: "Not Found" });
    return;
  }

  if (checkExpired(urlObj)) {
    res.status(410).json({ message: "Url Expired" });
    return;
  }

  res.json({
    analytics: urlObj.analytics.slice(-5).map((info) => info.ip),
    clickCount: urlObj.clickCount,
  });
  return;
});

app.get("/*", (req, res, next) => {
  const { url } = req;
  if (endpoints.find((u) => url === u)) {
    next();
    return;
  }
  const urlObj = urlMap.get(url.slice(1));
  if (!urlObj) {
    res.status(404).json({ message: "Not Found" });
    return;
  }

  if (checkExpired(urlObj)) {
    res.status(410).json({ message: "Url Expired" });
    return;
  }

  updUrlStat(urlObj, req);

  res.redirect(`${urlObj.originalUrl}`);
  return;
});

app.delete("/delete/*", (req, res) => {
  const { url } = req;
  const shortenUrl = url.split("/")?.at(-1) || "";

  if (!urlMap.has(shortenUrl)) {
    res.status(404).json({ message: "Not Found" });
    return;
  }
  urlMap.delete(shortenUrl);
  res.status(204).json({ message: "Deleted" });
  return;
});

export default app;
