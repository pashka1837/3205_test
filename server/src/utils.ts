import {
  Anal_DTO,
  Anal_Entity,
  Url_DTO,
  Url_Entity,
  UrlInfo_Entity,
} from "./types";

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

export function generateAlias(alias?: string) {
  if (alias) return alias;
  return generateHash();
}

export function checkReqData(originalUrl: any, expiresAt: any, alias: any) {
  if (
    !originalUrl ||
    typeof originalUrl !== "string" ||
    (expiresAt && (typeof expiresAt !== "number" || expiresAt < Date.now())) ||
    (alias && (typeof alias !== "string" || alias.length > 20))
  )
    return false;
  return true;
}

export function checkExpired(expiresAt: Date | null) {
  if (expiresAt && Date.parse(expiresAt.toString()) < Date.now()) return true;
  return false;
}

export function mapAnalDto(analDTO: Anal_DTO): Anal_Entity {
  return {
    clickCount: analDTO.clickCount,
    ips: analDTO.analitic.map((obj) => obj.ip),
  };
}

export function mapToUrlEnt(urlDto: Url_DTO): Url_Entity {
  return {
    alias: urlDto.alias,
    url: urlDto.url,
  };
}

export function mapToUrlInfoEnt(urlDto: Url_DTO): UrlInfo_Entity {
  return {
    alias: urlDto.alias,
    url: urlDto.url,
    clickCount: urlDto.clickCount,
    createdAt: urlDto.createdAt,
  };
}
