type SingleUrlProps = UrlEnt & {
  handleDelete(alias: string): Promise<void>;
  handleGetInfo(alias: string): Promise<void>;
  handleGetAnal(alias: string): Promise<void>;
};

const apiUrl = import.meta.env.VITE_API_URL;

export function SingleUrl({
  alias,
  url,
  handleDelete,
  handleGetInfo,
  handleGetAnal,
}: SingleUrlProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 4fr 1fr 1fr 1fr",
        alignItems: "baseline",
        gap: "30px",
        width: "80%",
      }}
    >
      <a
        href={`${apiUrl}/${alias}`}
        style={{ textDecoration: "none", minWidth: "200px" }}
      >
        {apiUrl}/{alias}
      </a>
      <p
        style={{
          whiteSpace: "nowrap",
          overflowX: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {url}
      </p>
      <button
        className="infoBtn"
        type="button"
        onClick={() => handleGetInfo(alias)}
      >
        Get Info
      </button>
      <button
        className="infoBtn"
        type="button"
        onClick={() => handleGetAnal(alias)}
      >
        Analytics
      </button>
      <button
        className="infoBtn"
        type="button"
        onClick={() => handleDelete(alias)}
      >
        Delete
      </button>
    </div>
  );
}
