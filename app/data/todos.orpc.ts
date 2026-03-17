import { ORPCError, os } from "@orpc/server"
import { createTodo, deleteTodo, listTodos, updateTodo } from "./todos.data"
import z from "zod"

const listTodosRPC = os.handler(listTodos)

const createTodoRPC = os
  .input(z.object({ name: z.string() }))
  .handler(async ({ input: { name } }) => {
    const todo = await createTodo({ name })
    return todo
  })

const updateTodoRPC = os
  .input(
    z.object({
      id: z.string(),
      name: z.string().optional(),
      completed: z.boolean().optional(),
    }),
  )
  .handler(async ({ input: { id, name, completed } }) => {
    if (!id) {
      throw new ORPCError("ID is required")
    }
    return await updateTodo({ id, name, completed })
  })

const deleteTodoRPC = os
  .input(z.object({ id: z.string() }))
  .handler(async ({ input: { id } }) => {
    if (!id) {
      throw new ORPCError("ID is required")
    }
    return await deleteTodo({ id })
  })

export const todosRouter = {
  list: listTodosRPC,
  create: createTodoRPC,
  update: updateTodoRPC,
  delete: deleteTodoRPC,
}
