// Minimal static server for the built site (dist/), mirroring GitHub Pages
// semantics: directory index.html, 301 from slashless paths to the trailing-
// slash form (query preserved), extensionless .html resolution, and the root
// 404.html for unknown paths. Zero dependencies; for local preview only.
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const ROOT = new URL("../dist", import.meta.url).pathname;
const PORT = Number(process.env.PORT || 3000);

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json",
};

function send(res, status, filePath) {
  res.writeHead(status, {
    "Content-Type":
      CONTENT_TYPES[extname(filePath)] || "application/octet-stream",
  });
  createReadStream(filePath)
    .on("error", () => res.destroy())
    .pipe(res);
}

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  // Normalize and contain the path inside ROOT.
  const pathname = normalize(decodeURIComponent(url.pathname)).replace(
    /^(\.\.[/\\])+/,
    "",
  );
  const fsPath = join(ROOT, pathname);
  if (!fsPath.startsWith(ROOT)) {
    res.writeHead(400).end("Bad request");
    return;
  }

  if (pathname.endsWith("/")) {
    const index = join(fsPath, "index.html");
    if (existsSync(index)) return send(res, 200, index);
  } else if (existsSync(fsPath) && statSync(fsPath).isFile()) {
    return send(res, 200, fsPath);
  } else if (existsSync(fsPath) && statSync(fsPath).isDirectory()) {
    // GitHub Pages redirects slashless directory URLs, keeping the query.
    res.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end();
    return;
  } else if (existsSync(`${fsPath}.html`)) {
    return send(res, 200, `${fsPath}.html`);
  }

  const notFound = join(ROOT, "404.html");
  if (existsSync(notFound)) return send(res, 404, notFound);
  res.writeHead(404).end("Not found");
});

// Browsers abort in-flight requests on navigation; never crash on that.
server.on("clientError", (err, socket) => socket.destroy());
server.on("connection", (socket) => socket.on("error", () => {}));

server.listen(PORT, () => {
  console.log(`Serving ${ROOT} at http://localhost:${PORT}`);
});
