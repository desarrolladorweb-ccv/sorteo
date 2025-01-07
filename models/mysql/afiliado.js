import mysql from "mysql2/promise";

const DEFAULT_CONFIG = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "moviesdb",
  waitForConnections: true,
  connectionLimit: 10, // Número máximo de conexiones
  queueLimit: 0, // Sin límite en la cola de solicitudes
};

const DB_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10, // Número máximo de conexiones
  queueLimit: 0, // Sin límite en la cola de solicitudes
};

const connectionString = DB_CONFIG ?? DEFAULT_CONFIG;

const connection = await mysql.createPool(connectionString);

export class AfiliadoModel {
  //=========== CONSULTA TODOS ======================
  static async getAll() {
    const [afiliados] = await connection.query("SELECT * FROM afiliados");
    if (afiliados.length === 0) return [];
    return afiliados;
  }
  //=========== CONSULTA POR ID ======================
  static async getById({ id }) {
    const [afiliado] = await connection.query(
      `SELECT * FROM afiliados WHERE id = ?;`,
      [id]
    );
    if (afiliado.length === 0) return [];
    return afiliado[0];
  }
  //=========== CONSULTA UN AFILIADO POR MATRICULA ======================
  static async getByMatricula({ matricula }) {
    const [afiliado] = await connection.query(
      `SELECT * FROM afiliados WHERE matricula = ?;`,
      [matricula]
    );
    if (afiliado.length === 0) return [];
    return afiliado[0];
  }
  //=========== CREA UN NUEVO AFILIADO ======================
  static async create({ input }) {
    const { matricula, nombre, direccion, telefono, email } = input;
    try {
      // Validar el campo "matricula"
      if (!matricula) {
        return { error: "Matrícula es requerida" };
      }
      if (!nombre) {
        return { error: "Nombre es requerido" };
      }
      if (!email) {
        return { error: "Correo electrónico es requerido" };
      }

      const existe = await this.getByMatricula(matricula);
      if (existe.length > 0) {
        return { error: "Ya existe un afiliado con esa matrícula" };
      }
      // Insertar nuevo afiliado en la base de datos
      const data = await connection.query(
        "INSERT INTO afiliados (matricula, nombre, direccion, telefono, email) VALUES (?, ?, ?, ?, ?)",
        [matricula, nombre, direccion, telefono, email]
      );
      const nuevaAsignacion = this.getByMatricula(matricula);
      return { error: false, data: nuevaAsignacion[0][0], ok: true };
    } catch (error) {
      console.error("Error al crear afiliado:", error);

      return { error: "Error no especificado" };
    }
  }
  //=========== ELIMINA UN AFILIADO POR ID ======================
  static async delete({ id }) {
    const [afiliado] = await connection.query(
      `SELECT * FROM afiliados WHERE id = ?;`,
      [id]
    );
    if (sorteo.length === 0) return null;

    await connection.query(`DELETE FROM afiliados WHERE id = ?;`, [id]);
    return afiliado[0];
  }
  //=========== ACTUALIZA UN AFILIADO POR ID ======================
  static async update({ id, input }) {
    const [afiliado] = await connection.query(
      `SELECT * FROM afiliados WHERE id = ?;`,
      [id]
    );
    if (sorteo.length === 0) return null;

    const { matricula, nombre, direccion, telefono, email } = input;

    await connection.query(
      `UPDATE afiliados SET matricula=?, nombre=?, direccion=?, telefono=?, email=? WHERE id = ?;`,
      [matricula, nombre, direccion, telefono, email, id]
    );

    const [updatedAfiliado] = await connection.query(
      `SELECT * FROM afiliado WHERE id = ?;`,
      [id]
    );

    return updatedAfiliado[0];
  }
}
