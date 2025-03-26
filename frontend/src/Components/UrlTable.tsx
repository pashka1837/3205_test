type UrlTableProps = {
  urls: Url_DTO[];
};
const apiUrl = import.meta.env.VITE_API_URL;

export function UrlTable({ urls }: UrlTableProps) {
  return (
    <div
      style={{
        maxHeight: "50dvh",
        overflow: "auto",
        display: "grid",
        justifyContent: "center",
        border: "1px solid black",
      }}
    >
      <h4 style={{ textAlign: "center" }}>Existing Urls</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "30px",
        }}
      >
        <p
          style={{ textDecoration: "none", minWidth: "200px", fontWeight: 800 }}
        >
          Shorten Url
        </p>
        <p style={{ fontWeight: 800 }}>Original Url</p>
      </div>
      {urls.map((d) => (
        <SingleUrl key={d.alias} {...d} />
      ))}
    </div>
  );
}

type SingleUrlProps = Url_DTO;

function SingleUrl({ alias, url }: SingleUrlProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <a
        href={`${apiUrl}/${alias}`}
        style={{ textDecoration: "none", minWidth: "200px" }}
      >
        {apiUrl}/{alias}
      </a>
      <p>{url}</p>
    </div>
  );
}
