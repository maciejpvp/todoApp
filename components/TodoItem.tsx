"use client";
import {
  changeTodoContent,
  changeTodoState,
  deleteNewTodoItem,
} from "@/actions/todo";
import { Checkbox } from "@heroui/checkbox";
import { DeleteButton } from "./DeleteButton";

type ToDoItemProps = {
  id: number;
  content: string;
  active: boolean;
};

export const TodoItem = ({ id, content, active }: ToDoItemProps) => {
  return (
    <div className="flex flex-row items-center justify-center group">
      <Checkbox
        isSelected={active}
        onValueChange={(newState) => changeTodoState(id, newState)}
      ></Checkbox>
      <div className="flex flex-row items-center justify-center gap-1 ">
        <input
          type="text"
          defaultValue={content}
          onChange={(e) => changeTodoContent(id, e.target.value)}
          className="bg-stone-900 outline-none"
        />
        <button
          onClick={() => deleteNewTodoItem(id)}
          className="opacity-0 group-hover:opacity-100 transition-all duration-150"
        >
          <DeleteButton />
        </button>
      </div>
    </div>
  );
};
