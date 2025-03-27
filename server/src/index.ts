import app from "./main";

const port = process.env.SERVER_PORT;
console.log("process.env.SERVER_PORT ", process.env.SERVER_PORT);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
