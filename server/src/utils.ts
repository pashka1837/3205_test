import { Request } from "express";
import { RequestInfoType, UrlInfoType, UrlMapType } from "./types";

export function generateHash() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 6) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function generateUrl(urlMap: UrlMapType, alias?: string) {
  if (alias) return alias;

  let newUrl = generateHash();
  while (urlMap.has(newUrl)) {
    newUrl = generateHash();
  }
  return newUrl;
}

export function saveUrl(
  urlMap: UrlMapType,
  originalUrl: string,
  newUrl: string,
  expiresAt?: number
) {
  const urlInfo: UrlInfoType = {
    originalUrl,
    clickCount: 0,
    createdAt: Date.now(),
    analytics: [],
    expiresAt: expiresAt,
  };

  urlMap.set(newUrl, urlInfo);
}

export function checkExpired(urlObj: UrlInfoType) {
  if (urlObj.expiresAt && urlObj.expiresAt < Date.now()) return true;
  return false;
}

export function updUrlStat(urlObj: UrlInfoType, req: Request) {
  const { ip } = req;
  const reqInfo: RequestInfoType = {
    date: Date.now(),
    ip: ip || "",
  };
  urlObj.clickCount += 1;
  urlObj.analytics.push(reqInfo);
}
