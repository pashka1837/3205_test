import { endpoints } from "./constants";
import {
  createAlias,
  deleteUrl,
  getAllUrls,
  getAnal,
  getByAlias,
  updateUrl,
} from "./data-access";
import { ApiUseCase } from "./types";
import {
  checkExpired,
  generateAlias,
  mapAnalDto,
  mapToUrlEnt,
  mapToUrlInfoEnt,
} from "./utils";

export const shortenUrl_useCase: ApiUseCase = async (req, res) => {
  const { originalUrl, expiresAt, alias } = req.body;
  if (
    !originalUrl ||
    typeof originalUrl !== "string" ||
    (expiresAt && (typeof expiresAt !== "number" || expiresAt < Date.now())) ||
    (alias && (typeof alias !== "string" || alias.length > 20))
  ) {
    res.status(400).json({ message: "Wrong data", success: false });
    return;
  }

  const shortUrl = generateAlias(alias);

  const expireDate = expiresAt ? new Date(expiresAt) : null;

  try {
    const newUrl = await createAlias(originalUrl, shortUrl, expireDate);
    const urlEnt = mapToUrlEnt(newUrl);
    res.json({ data: urlEnt, success: true });
    return;
  } catch (e: any) {
    if (e.message.includes("Unique constraint failed on the fields: (`alias`)"))
      res.status(400).json({ message: "Alias already exists", success: false });
    else
      res.status(400).json({ message: "Something went wrong", success: false });
    return;
  }
};

export const getAllUrls_useCase: ApiUseCase = async (req, res) => {
  try {
    const urls = await getAllUrls();
    const urlEntsAr = urls.map((urlEnt) => mapToUrlEnt(urlEnt));
    res.json({ data: urlEntsAr, success: true });
  } catch {
    res.status(400).json({ message: "Something went wrong", success: false });
  }
  return;
};

export const redirToUrl_useCase: ApiUseCase = async (req, res, next) => {
  const { url, ip } = req;

  if (endpoints.find((u) => url === u)) {
    next!();
    return;
  }

  const alias = url.slice(1);

  if (!alias || typeof alias !== "string" || alias.length > 20) {
    res.status(400).json({ message: "Wrong data", success: false });
    return;
  }

  try {
    const updUrl = await updateUrl(alias, ip || "");
    if (checkExpired(updUrl.expiresAt)) {
      res.status(410).json({ message: "Url Expired", success: false });
      return;
    }
    res.redirect(`${updUrl.url}`);
    return;
  } catch {
    res.status(404).json({ message: "Not Found", success: false });
    return;
  }
};

export const getInfo_useCase: ApiUseCase = async (req, res) => {
  const { url } = req;
  const alias = url.split("/")?.at(-1) || "";

  if (!alias || alias.length > 20) {
    res.status(400).json({ message: "Wrong data", success: false });
    return;
  }

  try {
    const urlInfo = await getByAlias(alias);
    if (!urlInfo) {
      res.status(404).json({ message: "Not Found", success: false });
      return;
    }
    if (checkExpired(urlInfo.expiresAt)) {
      res.status(410).json({ message: "Url Expired", success: false });
      return;
    }
    const urlInfoEnt = mapToUrlInfoEnt(urlInfo);
    res.json({
      data: urlInfoEnt,
      success: true,
    });
    return;
  } catch {
    res.status(400).json({ message: "Something went wrong", success: false });
    return;
  }
};

export const deleteUrl_useCase: ApiUseCase = async (req, res) => {
  const { url } = req;
  const alias = url.split("/")?.at(-1) || "";
  if (!alias || alias.length > 20) {
    res.status(400).json({ message: "Wrong data", success: false });
    return;
  }

  try {
    await deleteUrl(alias);
    res.status(204).json({ message: "Deleted", success: true });
    return;
  } catch (e) {
    res.status(404).json({ message: "Not Found", success: false });
    return;
  }
};

export const getAnal_useCase: ApiUseCase = async (req, res) => {
  const { url } = req;
  const alias = url.split("/")?.at(-1) || "";

  if (!alias || alias.length > 20) {
    res.status(400).json({ message: "Wrong data", success: false });
    return;
  }

  try {
    const analDTO = await getAnal(alias);
    if (!analDTO) {
      res.status(404).json({ message: "Not Found", success: false });
      return;
    }
    if (checkExpired(analDTO.expiresAt)) {
      res.status(410).json({ message: "Url Expired", success: false });
      return;
    }
    const analData = mapAnalDto(analDTO);

    res.json({
      data: analData,
      success: true,
    });
    return;
  } catch {
    res.status(400).json({ message: "Something went wrong", success: false });
    return;
  }
};
