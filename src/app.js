import express from "express";
import fs from "fs";
import { route as movieRoutes } from "./modules/movies/routes/movieRoutes.js";

const app = express();

app.use(express.json());

app.use("/movies", movieRoutes);

app.get("/", (req, res) => {
  const html = fs.readFileSync("./index.html");

  res.setHeader("Content-type", "text/html");
  res.send(html);
});

app.post("/movies", (req, res) => {
  const movie = req.body;

  const movies = JSON.parse(fs.readFileSync("./movies.json"));

  movies.push(movie);

  fs.writeFileSync("./movies.json", movies);

  res.send({ success: true, message: "movie added" });
});

export { app };
