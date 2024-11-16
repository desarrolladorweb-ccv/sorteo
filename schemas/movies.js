/*
    En este esquema se usa zod para hacer validaciones de entrada
    - Que los campos requeridos estén
    - Que los números verdaderamente sean números
    - Que los textos verdaderamente sean textos
    - Establecer los rangos de valores que se permitan
    - Que los enlaces sí sean enlaces
    - Que los valores por defecto si sean los valores predeterminados
    - ETC.
*/

import z from "zod";

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Movie title is required.",
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: "Poster must be a valid URL",
  }),
  genre: z.array(
    z.enum([
      "Action",
      "Adventure",
      "Crime",
      "Comedy",
      "Drama",
      "Fantasy",
      "Horror",
      "Thriller",
      "Sci-Fi",
    ]),
    {
      required_error: "Movie genre is required.",
      invalid_type_error: "Movie genre must be an array of enum Genre",
    }
  ),
});

export function validateMovie(input) {
  return movieSchema.safeParse(input);
}

export function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input);
}
