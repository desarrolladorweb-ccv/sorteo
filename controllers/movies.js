/*
    Este es el documento principal para todos los controladores de la ruta movies

    Se maneja como clases, y el constructor de esta clase recibe como parámetro el modelo, aquí se realizan validaciones de formato y coherencia.

    Cada método de esta clase es una función que permite hacer algo en una ruta específica.
    Cada método debe ser asíncrono y llamar un método del modelo, encargado de realizar dicha función.
    En este punto el controlador no sabe que hace el modelo y es la idea principal para que el modelo pueda ser cualquiera, sin importar si es una base de datos estructurada, no estructurada o local en JSON.
    Solo recibe datos del modelo y devuelve lo que tiene que devolver.
*/

import { validateMovie, validatePartialMovie } from "../schemas/movies.js";

export class MovieController {
  constructor({ movieModel }) {
    this.movieModel = movieModel;
  }

  getAll = async (req, res) => {
    const { genre } = req.query;
    const movies = await this.movieModel.getAll({ genre });
    res.json(movies);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const movie = await this.movieModel.getById({ id });
    if (movie) return res.json(movie);
    res.status(404).json({ message: "Movie not found" });
  };

  create = async (req, res) => {
    const result = validateMovie(req.body);

    if (!result.success) {
      // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newMovie = await this.movieModel.create({ input: result.data });

    res.status(201).json(newMovie);
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const result = await this.movieModel.delete({ id });

    if (result === false) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.json({ message: "Movie deleted" });
  };

  update = async (req, res) => {
    const result = validatePartialMovie(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    const updatedMovie = await this.movieModel.update({
      id,
      input: result.data,
    });

    return res.json(updatedMovie);
  };
}
