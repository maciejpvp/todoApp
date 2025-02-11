import db from "./db";

type User = {
  id: number;
  email: string;
  password: string;
};

export const createUser = (email: string, password: string): number => {
  const result = db
    .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
    .run(email, password);
  return result.lastInsertRowid as number;
};

export const getUserByEmail = (email: string): User | undefined => {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email) as
    | User
    | undefined;
};
