import app from "./main";

const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
