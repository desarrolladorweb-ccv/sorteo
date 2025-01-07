import z from "zod";

const sorteoSchema = z.object({
  matricula: z.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Movie title is required.",
  }),
});

export default function validateSorteo(input) {
  return sorteoSchema.safeParse(input);
}
