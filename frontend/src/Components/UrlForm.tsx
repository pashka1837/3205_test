import { FormEvent, useState } from "react";
import { createUrl } from "../lib/apiReq";

type UrlFormProps = {
  setUrls: React.Dispatch<React.SetStateAction<UrlEnt[]>>;
  urls: UrlEnt[];
};

export function UrlForm({ setUrls, urls }: UrlFormProps) {
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formElement = e.target as HTMLFormElement;

    const formData = new FormData(e.currentTarget);
    const originalUrl = formData.get("originalUrl");
    const alias = formData.get("alias");
    const expiresAt = formData.get("expiresAt");

    if (
      !originalUrl ||
      (originalUrl && typeof originalUrl !== "string") ||
      (alias && typeof alias !== "string") ||
      (expiresAt && typeof expiresAt !== "string")
    ) {
      setError("Wrong data");
      return;
    }

    const resData = await createUrl({ originalUrl, alias, expiresAt });
    if (resData.success) setUrls([resData.data, ...urls]);
    else setError(resData.message);

    formElement.reset();
    return;
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
