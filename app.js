/*
    Aquí se crea el servidor con Express, se llaman a los distintos Routers y se llaman algunos middleware como CORS.

    Se exporta la función createApp con el parámetro movieModel que es el modelo que se pasará si se usa MySQL o una base de datos local en JSON.

*/
import express, { json } from "express"; // require -> commonJS
import { createMovieRouter } from "./routes/movies.js";
import { corsMiddleware } from "./middlewares/cors.js";
import "dotenv/config";

// después
export const createApp = ({ movieModel }) => {
  const app = express();
  app.use(json());
  app.use(corsMiddleware());
  app.disable("x-powered-by");

  app.use("/movies", createMovieRouter({ movieModel }));

  const PORT = process.env.PORT ?? 1234;

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });
};
