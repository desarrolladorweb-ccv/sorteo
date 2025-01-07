import { Router } from "express";
import { AfiliadoController } from "../controllers/afiliado.js";

export const createAfiliadoRouter = ({ afiliadoModel }) => {
  const afiliadoRouter = Router();

  const afiliadoController = new AfiliadoController({ afiliadoModel });

  afiliadoRouter.get("/", afiliadoController.getAll);
  afiliadoRouter.post("/", afiliadoController.create);

  afiliadoRouter.get("/:id", afiliadoController.getById);
  afiliadoRouter.delete("/:id", afiliadoController.delete);
  afiliadoRouter.patch("/:id", afiliadoController.update);

  return afiliadoRouter;
};
