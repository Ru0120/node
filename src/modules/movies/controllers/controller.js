import fs from "fs";
import { readJSONFile } from "../../../utils/utils.js";
import { request } from "http";

const movieList = (req, res) => {
  const movies = readJSONFile("movies");

  const { limit, search } = req.query;

  let result = [];

  if (limit) {
    for (let i = 0; i < limit; i++) {
      result.push(movies[i]);
    }
  }

  if (search) {
    result = result.filter((movie) => movie.title.includes(search));
  }

  if (!result.length) {
    res.send(movies);
  }

  res.send(result);
};

const movieDetail = (req, res) => {
  const movies = readJSONFile("movies");
  const { id } = req.params;

  const movie = movies.find((movie) => movie.id === parseInt(id));

  res.send(movie);
};

const movieAdd = (req, res) => {
  const movie = req.body;

  const movies = readJSONFile("movies");

  movies.push(movie);

  fs.writeFileSync("./data/movies.json", JSON.stringify(movies));

  res.send({ success: true, message: "movie added" });
};

const movieEdit = (req, res) => {
  const { id } = req.params;
  const movie = req.body;
  const movies = readJSONFile("movies");
  const movieIndex = movies.findIndex((movie) => movie.id === parseInt(id));
  movies[movieIndex] = movie;

  fs.writeFileSync("./data/movies.json", JSON.stringify(movies));
  res.send({ success: true, message: "movie updated" });
};
const moviePatch = (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const movies = readJSONFile("movies");
  const targetMovie = movies.find((movie) => movie.id === parseInt(id));
  for (const key in body) {
    if (targetMovie[key]) {
      targetMovie[key] = body[key];
    }
  }
  fs.writeFileSync("./data/movies.json", JSON.stringify(movies));
  res.send({ success: true, message: "movie updated" });
};

export { movieList, movieDetail, movieAdd, movieEdit, moviePatch };
