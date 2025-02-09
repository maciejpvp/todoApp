"use client";
import {
  changeTodoContent,
  changeTodoState,
  deleteNewTodoItem,
} from "@/actions/todo";
import { Checkbox } from "@heroui/checkbox";
import { DeleteButton } from "./DeleteButton";
import { useOptimistic, useTransition } from "react";

type ToDoItemProps = {
  id: number;
  content: string;
  active: boolean;
};

export const TodoItem = ({ id, content, active }: ToDoItemProps) => {
  // eslint-disable-next-line
  const [_, startTransition] = useTransition();
  const [optimisticActive, setOptimisticActive] = useOptimistic(active);

  const handleCheckboxChange = (newState: boolean) => {
    startTransition(async () => {
      setOptimisticActive(newState);
      try {
        await changeTodoState(id, newState);
      } catch {
        setOptimisticActive(active);
      }
    });
  };

  return (
    <div className="flex flex-row items-center justify-center group">
      <Checkbox
        isSelected={optimisticActive}
        onValueChange={handleCheckboxChange}
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
          className="opacity-0 group-hover:opacity-100 transition-all duration-10"
        >
          <DeleteButton />
        </button>
      </div>
    </div>
  );
};
