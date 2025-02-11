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
    <div className="flex flex-col gap-6">
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
      <form
        action={addNewTodoItem.bind(null, +id)}
        className=" bg-stone-800 py-1 flex flex-row justify-center rounded-md"
      >
        <button type="submit" className="w-[100%]">
          Add
        </button>
      </form>
    </div>
  );
};

export default EditorSelectedPage;
