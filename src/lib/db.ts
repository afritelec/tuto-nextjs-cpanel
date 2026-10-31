import mysql, { type RowDataPacket } from "mysql2/promise";

export type Task = { id: number; title: string; done: number };

const pool = mysql.createPool({
  host: process.env.DB_HOST ?? "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf8mb4",
  connectionLimit: 5,
});

let ready: Promise<unknown> | undefined;

// Crée la table au premier accès : aucune migration à lancer pour cette démo.
function ensureTable() {
  ready ??= pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      done TINYINT(1) NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) DEFAULT CHARSET=utf8mb4
  `);
  return ready;
}

export async function listTasks() {
  await ensureTable();
  const [rows] = await pool.query<(Task & RowDataPacket)[]>(
    "SELECT id, title, done FROM tasks ORDER BY done, id DESC",
  );
  return rows;
}

export async function createTask(title: string) {
  await ensureTable();
  await pool.execute("INSERT INTO tasks (title) VALUES (?)", [title]);
}

export async function renameTask(id: number, title: string) {
  await pool.execute("UPDATE tasks SET title = ? WHERE id = ?", [title, id]);
}

export async function switchTask(id: number) {
  await pool.execute("UPDATE tasks SET done = 1 - done WHERE id = ?", [id]);
}

export async function removeTask(id: number) {
  await pool.execute("DELETE FROM tasks WHERE id = ?", [id]);
}
