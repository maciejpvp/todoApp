"use server";
import {
  changeTodoState as dbChangeTodoState,
  changeTodoContent as dbChangeTodoContent,
  createNewTodoItem as dbCreateNewTodoItem,
  deleteTodoItem as dbDeleteTodoItem,
  createTodoList as dbCreateTodoList,
  deleteTodoList as dbDeleteTodoList,
  changeTodoListName as dbChangeTodoListName,
} from "@/lib/todos";
import { revalidatePath } from "next/cache";

export const changeTodoState = async (id: number, newState: boolean) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  dbChangeTodoState(id, newState ? 1 : 0);
  revalidatePath("/dashboard");
};

export const changeTodoContent = async (id: number, newContent: string) => {
  dbChangeTodoContent(id, newContent);
};

export const addNewTodoItem = async (id: number) => {
  dbCreateNewTodoItem(id);
  revalidatePath("/dashboard");
};

export const deleteNewTodoItem = async (id: number) => {
  dbDeleteTodoItem(id);
  revalidatePath("/dashboard");
};

export const createTodoList = async () => {
  dbCreateTodoList();
  revalidatePath("/dashboard");
};

export const deleteTodoList = async (todoId: string) => {
  dbDeleteTodoList(todoId);
  revalidatePath("/dashboard");
};

export const changeTodoListName = async (id: number, newContent: string) => {
  dbChangeTodoListName(id, newContent);
};
