import { Router } from "express";
import { SorteoController } from "../controllers/sorteo.js";

export const createSorteoRouter = ({ sorteoModel }) => {
  const sorteoRouter = Router();

  const sorteoController = new SorteoController({ sorteoModel });

  sorteoRouter.get("/", sorteoController.getAll);
  sorteoRouter.post("/", sorteoController.create);

  sorteoRouter.get("/:id", sorteoController.getById);
  sorteoRouter.delete("/:id", sorteoController.delete);
  sorteoRouter.patch("/:id", sorteoController.update);

  return sorteoRouter;
};
