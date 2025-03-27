import { useEffect, useState } from "react";
import { UrlTable } from "./Components/UrlTable";
import { UrlForm } from "./Components/UrlForm";
import { getAllUrls } from "./lib/apiReq";

function App() {
  const [urls, setUrls] = useState<UrlEnt[]>([]);
  const [isLoad, setLoad] = useState(false);

  async function fetchAllUrls() {
    setLoad(true);
    const resData = await getAllUrls();
    if (resData.success) setUrls(resData.data);
    else alert(resData.message);
    setLoad(false);
  }

  useEffect(() => {
    fetchAllUrls();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        flexDirection: "column",
        height: "100dvh",
      }}
    >
      <UrlForm setUrls={setUrls} urls={urls} />
      <UrlTable setUrls={setUrls} urls={urls} isLoad={isLoad} />
    </div>
  );
}

export default App;
