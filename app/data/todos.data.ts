"use server"
import { prisma } from "../libs/prisma"

export const listTodos = async () => {
  const todos = await prisma.todo.findMany()
  return todos
}

export const createTodo = async ({ name }: { name: string }) => {
  const todo = await prisma.todo.create({
    data: {
      name: name,
      completed: false,
    },
  })
  return todo
}

export const updateTodo = async ({
  id,
  name,
  completed,
}: {
  id: string
  name?: string
  completed?: boolean
}) => {
  const todo = await prisma.todo.update({
    where: { id },
    data: {
      name,
      completed,
    },
  })
  return todo
}

export const deleteTodo = async ({ id }: { id: string }) => {
  const todo = await prisma.todo.delete({
    where: { id },
  })
  return todo
}
