import { useEffect, useState } from "react";
import { UrlTable } from "./Components/UrlTable";
import { CreateUrlForm } from "./Components/CreateUrlForm";

const apiUrl = import.meta.env.VITE_API_URL;
function App() {
  const [data, setData] = useState<UrlInfoType[]>([]);

  useEffect(() => {
    async function fetchAllUrls() {
      try {
        const res = await fetch(`${apiUrl}/getall`);
        const dataFromRes = await res.json();
        setData(dataFromRes.urlMap.reverse());
      } catch (error) {
        console.error(error);
      }
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
      <CreateUrlForm setData={setData} urlArray={data} />
      <UrlTable data={data} />
    </div>
  );
}

export default App;
