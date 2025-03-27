import { deleteUrl, getAnal, getInfo } from "../lib/apiReq";
import { Loader } from "./Loader/Loader";
import { SingleUrl } from "./SingleUrl";

type UrlTableProps = {
  isLoad: boolean;
  urls: UrlEnt[];
  setUrls: React.Dispatch<React.SetStateAction<UrlEnt[]>>;
};

export function UrlTable({ urls, setUrls, isLoad }: UrlTableProps) {
  if (isLoad) return <Loader isLoad={isLoad} />;

  async function handleDelete(alias: string) {
    const res = await deleteUrl(alias);
    if (!res.success) alert(res.message);
    else {
      setUrls(urls.filter((url) => url.alias !== alias));
    }
  }

  async function handleGetInfo(alias: string) {
    const res = await getInfo(alias);
    if (!res.success) alert(res.message);
    else {
      const date = new Date(res.data.createdAt).toLocaleString("ru-RU");
      alert(
        `Url: ${res.data.url}\nAlias: ${res.data.alias}\nClick count: ${res.data.clickCount}\nCreated at: ${date}`
      );
    }
  }

  async function handleGetAnal(alias: string) {
    const res = await getAnal(alias);
    if (!res.success) alert(res.message);
    else {
      const ips = res.data.ips.join(", ");
      alert(`Click count: ${res.data.clickCount}\nIps: ${ips}`);
    }
  }
  return (
    <div
      style={{
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        border: "1px solid black",
        height: "100%",
      }}
    >
      {urls.length ? (
        <>
          <h4 style={{ textAlign: "center" }}>Existing Urls</h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 4fr",
              gap: "30px",
              width: "80%",
            }}
          >
            <p style={{ fontWeight: 800 }}>Shorten Url</p>
            <p style={{ fontWeight: 800 }}>Original Url</p>
          </div>
        </>
      ) : (
        <h3>No urls found</h3>
      )}

      {urls.map((d) => (
        <SingleUrl
          key={d.alias}
          {...d}
          handleGetAnal={handleGetAnal}
          handleDelete={handleDelete}
          handleGetInfo={handleGetInfo}
        />
      ))}
    </div>
  );
}
