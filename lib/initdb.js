import sql from "better-sqlite3";
const db = sql("todo.db");

const DUMMY_TODOS = [
  {
    title: "pierwsze todo",
    creator_id: "1",
  },
  {
    title: "drugie todo",
    creator_id: "1",
  },
];

const DUMMY_CONTENT = [
  {
    todos_id: 1,
    content: "test1",
    active: 1,
  },
  {
    todos_id: 1,
    content: "test2",
    active: 0,
  },
];

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS todos (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       creator_id TEXT NOT NULL,
       title TEXT NOT NULL
    )
`
).run();

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS todoItems (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       todos_id INTEGER NOT NULL,
       content TEXT NOT NULL DEFAULT '',
       active INTEGER NOT NULL DEFAULT 0,
       FOREIGN KEY (todos_id) REFERENCES todos(id) ON DELETE CASCADE
    )
`
).run();

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS users (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       email TEXT NOT NULL,
       password TEXT NOT NULL
    )
`
).run();

db.exec(`CREATE TABLE IF NOT EXISTS sessions (
  id TEXT NOT NULL PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
)`);

async function initData() {
  const stmt = db.prepare(`
      INSERT INTO todos (creator_id, title) VALUES (
         @creator_id,
         @title
      )

   `);

  for (const todo of DUMMY_TODOS) {
    stmt.run(todo);
  }

  const stmt2 = db.prepare(`
    INSERT INTO todoItems (todos_id, content, active) VALUES (
        @todos_id,
        @content,
        @active
      )`);

  for (const content of DUMMY_CONTENT) {
    stmt2.run(content);
  }
}

initData();
