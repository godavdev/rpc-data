import { TodoForm } from "@/components/todo-form"
import { TodosFeed } from "@/components/todos-feed"

const HomePage = () => {
  return (
    <div className="p-6 space-y-6">
      <TodoForm />
      <TodosFeed />
    </div>
  )
}

export default HomePage
