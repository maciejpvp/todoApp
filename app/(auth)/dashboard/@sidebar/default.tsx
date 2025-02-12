import { createTodoList, deleteTodoList } from "@/actions/todo-actions";
import { TodoListItem } from "@/components/TodoListItem";
import { getTodosForUser, Todo } from "@/lib/todos";
import Link from "next/link";

export default async function Sidebar() {
  const todos: Todo[] = await getTodosForUser();
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold">Todo List</h1>
      <ul className="flex flex-col gap-2">
        {todos.map((item) => (
          <li
            key={item.id}
            className="flex flex-row bg-stone-700 rounded p-2 justify-between items-center relative"
          >
            <Link href={`/dashboard/${item.id}`}>
              <TodoListItem id={item.id} title={item.title} />
            </Link>
            <form
              action={deleteTodoList.bind(null, `${item.id}`)}
              className="absolute right-3 text-xl"
            >
              <button>x</button>
            </form>
          </li>
        ))}
      </ul>
      <form className="flex flex-col" action={createTodoList}>
        <button className="bg-stone-700 p-1 rounded-md">+</button>
      </form>
    </div>
  );
}
