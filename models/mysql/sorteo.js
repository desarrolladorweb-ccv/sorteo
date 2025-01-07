import mysql from "mysql2/promise";
import { OK } from "zod";

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

export class SorteoModel {
  //=========== CONSULTA TODOS ======================
  static async getAll() {
    const [sorteos] = await connection.query(
      "SELECT s.id, a.matricula, a.nombre, number FROM sorteo s INNER JOIN afiliados a ON a.id = s.matricula;"
    );
    if (sorteos.length === 0) return [];
    return sorteos;
  }
  //=========== CONSULTA POR ID ======================
  static async getById({ id }) {
    const [sorteo] = await connection.query(
      `SELECT * FROM sorteo WHERE id = ?;`,
      [id]
    );
    if (sorteo.length === 0) return [];
    return sorteo[0];
  }
  //=========== CONSULTA POR MATRÍCULA ======================
  static async getByMatricula({ matricula }) {
    const [sorteo] = await connection.query(
      `SELECT sorteo.id, afiliados.matricula, sorteo.number FROM sorteo INNER JOIN afiliados ON sorteo.matricula = afiliados.id WHERE afiliados.matricula = ?;`,
      [matricula]
    );
    if (sorteo.length === 0) return [];
    return sorteo[0];
  }
  //=========== CREA UN NUEVO SORTEO ======================
  static async create({ input }) {
    const { matricula } = input;
    try {
      // Validar el campo "matricula"
      if (!matricula) {
        return { error: "Matrícula es requerida" };
      }
      // Obtener todos los números existentes
      const [rows] = await connection.query("SELECT * FROM sorteo");
      const existingNumbers = rows.map((row) => row.number);
      const existingMatriculas = rows.map((row) => row.matricula);
      const [id_matricula] = await connection.query(
        `SELECT id FROM afiliados WHERE matricula = ?`,
        [matricula]
      );

      if (existingMatriculas.includes(id_matricula[0].id)) {
        return { error: "La matrícula ya tiene un número asignado" };
      }

      // Generar número único aleatorio
      let number;
      do {
        number = Math.floor(Math.random() * 999) + 1; // Número entre 1 y 999
      } while (existingNumbers.includes(number));

      // Insertar nuevo sorteo en la base de datos
      const data = await connection.query(
        "INSERT INTO sorteo (matricula, number) VALUES (?, ?)",
        [id_matricula[0].id, number]
      );
      const nuevaAsignacion = this.getByMatricula(matricula);
      console.log(nuevaAsignacion[0][0]);
      return { error: false, data: nuevaAsignacion[0][0], ok: true };
    } catch (error) {
      console.error("Error al crear sorteo:", error);

      return { error: "Error no especificado" };
    }
  }

  //=========== ELIMINA UN SORTEO POR ID ======================
  static async delete({ id }) {
    const [sorteo] = await connection.query(
      `SELECT * FROM sorteo WHERE id = ?;`,
      [id]
    );
    if (sorteo.length === 0) return null;

    await connection.query(`DELETE FROM sorteo WHERE id = ?;`, [id]);
    return sorteo[0];
  }
  //=========== ACTUALIZA UN SORTEO POR ID ======================
  static async update({ id, input }) {
    const [sorteo] = await connection.query(
      `SELECT * FROM sorteo WHERE id = ?;`,
      [id]
    );
    if (sorteo.length === 0) return null;

    const { matricula } = input;

    await connection.query(`UPDATE sorteo SET matricula = ? WHERE id = ?;`, [
      matricula,
      id,
    ]);

    const [updatedSorteo] = await connection.query(
      `SELECT * FROM sorteo WHERE id = ?;`,
      [id]
    );

    return updatedSorteo[0];
  }
}
