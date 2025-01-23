import { FormEvent, useState } from "react";

type CreateFormProps = {
  setData: React.Dispatch<React.SetStateAction<UrlInfoType[]>>;
  urlArray: UrlInfoType[];
};

const apiUrl = import.meta.env.VITE_API_URL;

export function CreateUrlForm({ setData, urlArray }: CreateFormProps) {
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formElement = e.target as HTMLFormElement;

    const formData = new FormData(e.currentTarget);
    const originalUrl = formData.get("originalUrl");
    const alias = formData.get("alias");
    const expiresAt = Number(formData.get("expiresAt"));

    try {
      const res = await fetch(`${apiUrl}/shorten`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          originalUrl,
          alias: alias || undefined,
          expiresAt: expiresAt ? expiresAt * 60000 + Date.now() : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }
      setData([
        { originalUrl: originalUrl as string, shortenUrl: data.newUrl },
        ...urlArray,
      ]);
    } catch {
      setError("something went wrong");
    }
    formElement.reset();
  }

  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <h3>Create Url Form</h3>
      <h4 style={{ display: error ? "block" : "none", color: "red" }}>
        {error}
      </h4>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "10px",
        }}
      >
        <label htmlFor="originalUrl">Original URL*</label>
        <input type="text" name="originalUrl" required />
        <label htmlFor="alias">Alias (less then 20 letters)</label>
        <input type="text" name="alias" pattern="\w{1,20}" />
        <label htmlFor="expiresAt">Expiration Time (in minutes)</label>
        <input type="text" name="expiresAt" pattern="^[1-9]\d{0,3}$" />
        <button type="submit">SHORTEN</button>
      </form>
    </div>
  );
}
