/* 
    Aqui se crean las rutas para cada tipo, en este caso se importa el controlador y se recibe el modelo para ese controlador.

    La estructura para crear una ruta es:
    - Se crea el Router
    - Se pide al controlador que cree un nuevo controlador con el respectivo modelo.
    - moviesRouter.VERBO('/RUTA', CONTROLADOR_DE_LA_RUTA)
*/
import { Router } from "express";
import { MovieController } from "../controllers/movies.js";

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router();

  const movieController = new MovieController({ movieModel });

  moviesRouter.get("/", movieController.getAll);
  moviesRouter.post("/", movieController.create);

  moviesRouter.get("/:id", movieController.getById);
  moviesRouter.delete("/:id", movieController.delete);
  moviesRouter.patch("/:id", movieController.update);

  return moviesRouter;
};
