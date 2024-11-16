/* 
    Este archivo se ejecutará si se quiere usar una base de datos local con JSON
    Recibe el createApp de app.js y el modelo de local file system y crea la app con ese modelo.
*/
import { createApp } from "./app.js";

import { MovieModel } from "./models/local-file-system/movie.js";

createApp({ movieModel: MovieModel });
