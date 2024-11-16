/* 
    Este archivo se ejecutará si se quiere usar una base de datos con MySQL
    Recibe el createApp de app.js y el modelo de mysql y crea la app con ese modelo.
*/

import { createApp } from "./app.js";

import { MovieModel } from "./models/mysql/movie.js";

createApp({ movieModel: MovieModel });
