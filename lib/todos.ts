import sql from "better-sqlite3";
const db = sql("todo.db");

export type Todo = {
  id: number;
  title: string;
  content: string;
  creator_id: string;
};

export type TodoContent = {
  id: number;
  todos_id: number;
  content: string;
  active: boolean;
};

export const getTodosForUser = (): Todo[] => {
  const todos = db.prepare(`SELECT * FROM todos`).all() as Todo[];
  return todos;
};

export const getTodoContentById = (id: string) => {
  const todo = db
    .prepare(`SELECT * FROM todoItems WHERE todos_id=?`)
    .all(id) as TodoContent[];
  return todo;
};

export const changeTodoState = (id: number, newState: number) => {
  db.prepare(`UPDATE todoItems SET active = @newState where id = @id`).run({
    newState,
    id,
  });
};

export const changeTodoContent = (id: number, newContent: string) => {
  db.prepare(`UPDATE todoItems SET content = @newContent where id = @id`).run({
    newContent,
    id,
  });
};

export const createNewTodoItem = (id: number) => {
  db.prepare(
    `INSERT INTO todoItems (todos_id, content, active) VALUES (?, ?, ?)`
  ).run(id, "", 0);
};

export const deleteTodoItem = (id: number) => {
  db.prepare(`DELETE FROM todoItems WHERE id=?`).run(id);
};
