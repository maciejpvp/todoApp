import { addNewTodoItem } from "@/actions/todo-actions";
import { TodoItem } from "@/components/TodoItem";
import { getTodoContentById, TodoContent } from "@/lib/todos";

const EditorSelectedPage = async ({
  params,
}: {
  params: { [key: string]: string };
}) => {
  const { id } = await params;
  const todo: TodoContent[] = getTodoContentById(id);

  return (
    <div className="flex flex-col gap-6 mt-56">
      {todo.length !== 0 && (
        <ul className="flex flex-col gap-6">
          {todo.map((item) => (
            <li key={item.id}>
              <TodoItem
                id={item.id}
                content={item.content}
                active={item.active}
              />
            </li>
          ))}
        </ul>
      )}
      {todo.length === 0 && (
        <h1 className="text-center font-semibold text-xl">
          Add something to the list first
        </h1>
      )}
      <form
        action={addNewTodoItem.bind(null, +id)}
        className=" bg-stone-800 py-1 flex flex-row justify-center rounded-md"
      >
        <button type="submit" className="w-64">
          Add
        </button>
      </form>
    </div>
  );
};

export default EditorSelectedPage;
