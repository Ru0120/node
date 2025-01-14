import express from "express";
import fs from "fs";

const route = express.Router();

route.get("/", (req, res) => {
  const movies = JSON.parse(fs.readFileSync("./movies.json"));

  const { movieTitile } = req.query;

  res.send({ success: true, data: movies });
});

export { route };
