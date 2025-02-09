import { getTodosForUser, Todo } from "@/lib/todos";
import Link from "next/link";

export default function Sidebar() {
  const todos: Todo[] = getTodosForUser();
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold">Todo List</h1>
      <ul className="flex flex-col gap-2">
        {todos.map((item) => (
          <li key={item.id} className="flex flex-row">
            <Link
              href={`/dashboard/${item.id}`}
              className="bg-stone-700 rounded-md p-2 w-full"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
