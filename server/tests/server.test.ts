import request from "supertest";
import app from "../src/main";

describe("POST /shorten alias", () => {
  const testUrlObj = {
    originalUrl: "https://google.com",
    alias: "xxxxxx",
  };
  it("should create url with alias and return shorten url", async () => {
    const res = await request(app).post("/shorten").send(testUrlObj);
    expect(res.status).toBe(200);
    expect(res.body.newUrl).toEqual(testUrlObj.alias);
  });

  it("should return 400 status cause alias already exists", async () => {
    const res = await request(app).post("/shorten").send(testUrlObj);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("Wrong data");
  });
});

describe("GET /*shortenUrl", () => {
  const testUrlObj = {
    originalUrl: "https://google.com",
    alias: "xxxxxx",
  };

  it("should return 302 status", async () => {
    await request(app).post("/shorten").send(testUrlObj);
    const res = await request(app).get(`/${testUrlObj.alias}`);
    expect(res.status).toBe(302);
    expect(res.header["location"]).toEqual(testUrlObj.originalUrl);
  });
});
