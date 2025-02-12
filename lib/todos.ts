import { getCurrentUser } from "./auth";
import db from "./db";

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

export const getTodosForUser = async (): Promise<Todo[]> => {
  const user = await getCurrentUser();
  if (!user.session?.userId) return [];
  const todos = db
    .prepare(`SELECT * FROM todos WHERE creator_id=?`)
    .all(user.session.userId) as Todo[];
  return todos;
};

export const createTodoList = async (): Promise<void> => {
  const user = await getCurrentUser();
  if (!user.session?.userId) return;

  db.prepare("INSERT INTO todos (title, creator_id) VALUES (?, ?)").run(
    "test",
    user.session?.userId
  );
};

export const deleteTodoList = async (todoId: string) => {
  const user = await getCurrentUser();
  if (!user.session?.userId) return;
  db.prepare("DELETE FROM todos WHERE id=? AND creator_id=?").run(
    todoId,
    user.session.userId
  );
};

export const changeTodoListName = (id: number, newTitle: string) => {
  db.prepare(`UPDATE todos SET title = @newTitle WHERE id = @id`).run({
    newTitle,
    id,
  });
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
  ).run(id, "New Item", 0);
};

export const deleteTodoItem = (id: number) => {
  db.prepare(`DELETE FROM todoItems WHERE id=?`).run(id);
};
