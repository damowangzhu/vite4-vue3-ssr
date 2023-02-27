import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import compression from "compression";
import serveStatic from "serve-static";
import { render } from "./dist/server/entry-server.js";

const resolve = (p) =>
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), p);

const manifest = fs.readFileSync(
  resolve("./dist/client/ssr-manifest.json"),
  "utf-8"
);
const template = fs.readFileSync(resolve("./dist/client/index.html"), "utf-8");

const app = express();
app.use(compression());
app.use(serveStatic(resolve("./dist/client"), { index: false }));

app.use("*", async (req, res, next) => {
  const url = req.originalUrl;
  try {
    const [appHtml, preloadLinks, piniaState, meta] = await render(
      url,
      manifest
    );

    const html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--ssr-outlet-->`, appHtml)
      .replace(`<!--pinia-state-->`, piniaState)
      .replace(`<!--title-->`, meta.title || "");

    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (error) {
    console.log(error);
    next();
  }
});

app.listen(3002, () => {
  console.log("Service start at: http://127.0.0.1:3002/");
});
