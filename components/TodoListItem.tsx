"use client";

import { changeTodoListName } from "@/actions/todo-actions";
import { useRef } from "react";

export const TodoListItem = ({ id, title }: { id: number; title: string }) => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      changeTodoListName(id, e.target.value);
    }, 500);
  };

  return (
    <input
      onChange={(e) => handleInputChange(e)}
      defaultValue={title}
      className="bg-stone-700 outline-none"
    />
  );
};
