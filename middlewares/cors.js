/*
    Este es un middleware que soluciona el problema de CORS en el navegador.

    En ACCEPTED_ORIGINS se colocan las rutas que permitirán el acceso a la api creada, las demás rutas no podrán acceder ya que tendrán un error de CORS.
*/
import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:8080",
  "http://localhost:1234",
  "https://movies.com",
  "https://midu.dev",
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  });
