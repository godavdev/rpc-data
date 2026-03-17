"use server"
import { revalidatePath } from "next/cache"
import { createTodo, deleteTodo, updateTodo } from "./todos.data"

export const createTodoAction = async ({ name }: { name: string }) => {
  const todo = await createTodo({ name })
  revalidatePath("/")
  return todo
}

export const updateTodoAction = async ({
  id,
  name,
  completed,
}: {
  id: string
  name?: string
  completed?: boolean
}) => {
  const todo = await updateTodo({
    id,
    name,
    completed,
  })
  revalidatePath("/")
  return todo
}

export const deleteTodoAction = async ({ id }: { id: string }) => {
  const todo = await deleteTodo({ id })
  revalidatePath("/")
  return todo
}
