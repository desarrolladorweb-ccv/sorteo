export class AfiliadoController {
  constructor({ afiliadoModel }) {
    this.afiliadoModel = afiliadoModel;
  }

  getAll = async (req, res) => {
    const afiliados = await this.afiliadoModel.getAll();
    return res.json(afiliados);
  };

  getById = async (req, res) => {
    const { id } = req.params;

    const afiliado = await this.afiliadoModel.getById({ id });

    if (afiliado === null) {
      return res.status(404).json({ error: "Afiliado not found" });
    }

    return res.json(afiliado);
  };

  create = async (req, res) => {
    const afiliado = await this.afiliadoModel.create({
      input: result.data,
    });

    if (afiliado["error"]) {
      return res.status(400).json(afiliado);
    }
    return res.status(201).json(afiliado);
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const afiliado = await this.afiliadoModel.delete({ id });

    if (afiliado === null) {
      return res.status(404).json({ error: res.error });
    }

    res.json(afiliado);
  };

  update = async (req, res) => {
    const { id } = req.params;
    const result = validateafiliado(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const afiliado = await this.afiliadoModel.update({ id, input: result.data });

    if (afiliado === null) {
      return res.status(404).json({ message: "afiliado not found" });
    }

    res.json(afiliado);
  };
}
