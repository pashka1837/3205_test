type UrlTableProps = {
  data: UrlInfoType[];
};
const apiUrl = import.meta.env.VITE_API_URL;

export function UrlTable({ data }: UrlTableProps) {
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
      {data.map((d) => (
        <SingleUrl key={d.shortenUrl} {...d} />
      ))}
    </div>
  );
}

type SingleUrlProps = UrlInfoType;

function SingleUrl({ originalUrl, shortenUrl }: SingleUrlProps) {
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
        href={`${apiUrl}/${shortenUrl}`}
        style={{ textDecoration: "none", minWidth: "200px" }}
      >
        {apiUrl}/{shortenUrl}
      </a>
      <p>{originalUrl}</p>
    </div>
  );
}
