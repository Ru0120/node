import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  if (req.url === "/news/trend") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const news = fs.readFileSync("news.json", "utf8");

    console.log(news);

    res.write(JSON.stringify(news));
    res.end();
  }

  if (req.url === "/zurhai") {
    res.writeHead(200, { "Content-Type": "application/json" });

    const zurhai = { udur: "2025.01.09/Purev garag" };

    res.write(JSON.stringify(zurhai));
    res.end();
  }

  if (req.url === "/weather") {
    res.writeHead(200, { "Counter-Type": "application/json" });
    const weather = { udur: -15, shunu: -21 };
    res.write(JSON.stringify(weather));
    res.end();
  }

  res.writeHead(404, "not found");
  res.end();
});

server.listen(3000);

console.log("server listening on 3000");
