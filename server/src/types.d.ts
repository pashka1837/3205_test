export type UrlInfoType = {
  originalUrl: string;
  clickCount: number;
  createdAt: number;
  analytics: RequestInfoType[];
  expiresAt?: number;
};

export type RequestInfoType = {
  date: number;
  ip: string;
};

export type UrlMapType = Map<string, UrlInfoType>;
