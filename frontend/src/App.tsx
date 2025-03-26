import { useEffect, useState } from "react";
import { UrlTable } from "./Components/UrlTable";
import { CreateUrlForm } from "./Components/CreateUrlForm";

const apiUrl = import.meta.env.VITE_API_URL;
function App() {
  const [urls, setUrls] = useState<Url_DTO[]>([]);
  const [isLoad, setLoad] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    async function fetchAllUrls() {
      setLoad(true);
      try {
        const res = await fetch(`${apiUrl}/getall`);
        const resData = (await res.json()) as GetAllRes;
        if (resData.success) setUrls(resData.data.reverse());
        else setErrMsg(resData.message);
      } catch {
        setErrMsg("Something went wrong");
      }
      setLoad(false);
    }

    fetchAllUrls();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gap: "30px",
      }}
    >
      <CreateUrlForm setUrls={setUrls} urls={urls} />
      <UrlTable urls={urls} />
    </div>
  );
}

export default App;
