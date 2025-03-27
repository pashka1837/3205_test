type UnsuccessRes = {
  message: string;
  success: false;
};

type GetAllRes =
  | {
      data: UrlEnt[];
      success: true;
    }
  | UnsuccessRes;

type CreateAliasRes =
  | {
      data: UrlEnt;
      success: true;
    }
  | UnsuccessRes;

type DeleteAliasRes =
  | {
      message: string;
      success: true;
    }
  | UnsuccessRes;

type GetInfoRes =
  | {
      data: UrlInfoEnt;
      success: true;
    }
  | UnsuccessRes;

type GetAnalRes =
  | {
      data: AnalEnt;
      success: true;
    }
  | UnsuccessRes;

type UrlInfoEnt = {
  url: string;
  alias: string;
  clickCount: number;
  createdAt: Date;
};

type UrlEnt = {
  url: string;
  alias: string;
};

type AnalEnt = {
  clickCount: number;
  ips: string[];
};

type CreateAliasDto = {
  originalUrl: string;
  alias: string | null;
  expiresAt: string | null;
};
