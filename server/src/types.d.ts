import { Analitic, Url } from "@prisma/client";
import { request, response, NextFunction } from "express";

export type Url_DTO = Url;

type Anal_DTO = {
  clickCount: number;
  expiresAt: Date | null;
  analitic: {
    ip: string;
  }[];
};

export type Anal_Entity = {
  clickCount: number;
  ips: string[];
};

export type Url_Entity = Pick<Url, "alias" | "url">;
export type UrlInfo_Entity = Pick<
  Url,
  "alias" | "url" | "clickCount" | "createdAt"
>;

export type ApiUseCase = (
  req: typeof request,
  res: typeof response,
  next?: NextFunction
) => Promise<void> | void;

export type GetUrlByAlias = (alias: string) => Promise<Url_DTO | null>;

export type CreateUrlAlias = (
  url: string,
  alias: string,
  expiresAt: Date | null
) => Promise<Url_DTO>;

export type GetAllUrls = () => Promise<Url_DTO[]>;

export type UpdateUrl = (alias: string, ip: string) => Promise<Url_DTO>;

export type DeleteUrl = (alias: string) => Promise<void>;

export type GetAnal = (alias: string) => Promise<Anal_DTO | null>;
