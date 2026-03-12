import { listTodos } from "@/app/data/todos.data"
import { TodoCard } from "./todo-card"

export const TodosFeed = async () => {
  const todos = await listTodos()
  return (
    <div className="w-full flex flex-col gap-6 items-center justify-center">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          id={todo.id}
          name={todo.name}
          completed={todo.completed}
        />
      ))}
    </div>
  )
}
