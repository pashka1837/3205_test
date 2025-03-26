type UnsuccessRes = {
  message: string;
  success: false;
};

type GetAllRes =
  | {
      data: Url_DTO[];
      success: true;
    }
  | UnsuccessRes;

type CreateAliasRes =
  | {
      data: Url_DTO;
      success: true;
    }
  | UnsuccessRes;

type Url_DTO = {
  url: string;
  alias: string;
};
