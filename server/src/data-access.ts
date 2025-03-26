import prisma from "./prisma-client";
import {
  GetUrlByAlias,
  CreateUrlAlias,
  GetAllUrls,
  UpdateUrl,
  DeleteUrl,
  GetAnal,
} from "./types";

export const getByAlias: GetUrlByAlias = async (alias) => {
  return await prisma.url.findUnique({
    where: {
      alias,
    },
  });
};

export const getAllUrls: GetAllUrls = async () => {
  return await prisma.url.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createAlias: CreateUrlAlias = async (url, alias, expiresAt) => {
  return await prisma.url.create({
    data: {
      url,
      alias,
      expiresAt,
    },
  });
};

export const updateUrl: UpdateUrl = async (alias, ip) => {
  return await prisma.url.update({
    where: {
      alias,
    },
    data: {
      clickCount: {
        increment: 1,
      },
      analitic: {
        create: [{ ip }],
      },
    },
  });
};

export const deleteUrl: DeleteUrl = async (alias) => {
  await prisma.url.delete({
    where: {
      alias,
    },
  });
};

export const getAnal: GetAnal = async (alias) => {
  return await prisma.url.findUnique({
    where: {
      alias,
    },
    select: {
      clickCount: true,
      expiresAt: true,
      analitic: {
        orderBy: {
          date: "desc",
        },
        select: {
          ip: true,
        },
        take: 5,
      },
    },
  });
};
