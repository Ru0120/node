import express, { application } from "express";
import fs from "fs";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/info", (req, res) => {
  const info = fs.readFileSync("./info.html");
  res, setHeader("Content-Type", "text/html");
  res.send(info);
});

//app.get("/", (req, res) => {
//res.sendFile("news");
//});

app.get("/movies", (req, res) => {
  let movies = JSON.parse(fs.readFileSync("./movies.json"));

  const { movieTitle } = req.query;

  console.log("movieTitle", movieTitle);

  const filtered = movies.filter((movie) => movie.title.includes(movieTitle));

  console.log("filtered", filtered);

  res.send(filtered);
});
app.post("/movies", (req, res) => {
  let movie = req.body;

  let movies = JSON.parse(fs.readFileSync("./movies.json"));

  movies.push(movie);

  fs.writeFileSync("./movies.json", JSON.stringify(movies));

  res.send({ success: true, message: "movie added" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
