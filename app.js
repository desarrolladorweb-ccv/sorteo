/*
    Aquí se crea el servidor con Express, se llaman a los distintos Routers y se llaman algunos middleware como CORS.

    Se exporta la función createApp con el parámetro movieModel que es el modelo que se pasará si se usa MySQL o una base de datos local en JSON.

*/
import express, { json } from "express"; // require -> commonJS
import { createSorteoRouter } from "./routes/sorteo.js";
import { createAfiliadoRouter } from "./routes/afiliado.js";
import { corsMiddleware } from "./middlewares/cors.js";
import "dotenv/config";
import cors from "cors";

// después
export const createApp = ({ sorteoModel, afiliadoModel }) => {
  const app = express();
  app.use(json());
  app.use(cors());
  app.disable("x-powered-by");

  app.use("/sorteo", createSorteoRouter({ sorteoModel }));
  app.use("/afiliado", createAfiliadoRouter({ afiliadoModel }));

  const PORT = process.env.PORT ?? 1234;
  const HOST = process.env.HOST ?? "localhost";
  app.listen(PORT, () => {
    console.log(`server listening on port http://${HOST}:${PORT}`);
  });
};
