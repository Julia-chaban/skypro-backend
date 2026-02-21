const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const PORT = process.env.PORT || 3003;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;
  const pathname = parsedUrl.pathname;

  if (pathname !== "/") {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not Found");
    return;
  }

  const queryKeys = Object.keys(query);

  if (queryKeys.length === 0) {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Hello, World!");
    return;
  }

  if (queryKeys.includes("hello")) {
    const name = query.hello;

    if (name === undefined || name === "") {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Enter a name");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`Hello, ${name}.`);
    return;
  }

  if (queryKeys.includes("users") && queryKeys.length === 1) {
    try {
      const filePath = path.join(__dirname, "./data/users.json");
      const usersData = fs.readFileSync(filePath, "utf8");
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(usersData);
    } catch (error) {
      console.error("Ошибка чтения файла:", error);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Internal Server Error");
    }
    return;
  }

  res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
  res.end();
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://127.0.0.1:${PORT}`);
});
