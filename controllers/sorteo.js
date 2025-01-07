import validateSorteo from "../schemas/sorteo.js";

export class SorteoController {
  constructor({ sorteoModel }) {
    this.sorteoModel = sorteoModel;
  }

  getAll = async (req, res) => {
    const sorteos = await this.sorteoModel.getAll();
    return res.json(sorteos);
  };

  getById = async (req, res) => {
    const { id } = req.params;

    const sorteo = await this.sorteoModel.getById({ id });

    if (sorteo === null) {
      return res.status(404).json({ error: "Sorteo not found" });
    }

    return res.json(sorteo);
  };

  create = async (req, res) => {
    const result = validateSorteo(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const sorteo = await this.sorteoModel.create({
      input: result.data,
    });

    if (sorteo["error"]) {
      return res.status(400).json(sorteo);
    }
    return res.status(201).json(sorteo);
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const sorteo = await this.sorteoModel.delete({ id });

    if (sorteo === null) {
      return res.status(404).json({ error: res.error });
    }

    res.json(sorteo);
  };

  update = async (req, res) => {
    const { id } = req.params;
    const result = validateSorteo(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const sorteo = await this.sorteoModel.update({ id, input: result.data });

    if (sorteo === null) {
      return res.status(404).json({ message: "Sorteo not found" });
    }

    res.json(sorteo);
  };
}
