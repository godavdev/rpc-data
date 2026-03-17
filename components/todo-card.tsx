"use client"
import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardAction, CardHeader, CardTitle } from "./ui/card"
import { updateTodoAction, deleteTodoAction } from "@/app/data/todos.actions"

interface Props {
  id: string
  name: string
  completed: boolean
}
export const TodoCard = ({ completed, id, name }: Props) => {
  const [updateLoading, setUpdateLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const toggleCompleted = async () => {
    setUpdateLoading(true)
    try {
      await updateTodoAction({
        id,
        completed: !completed,
      })
    } finally {
      setUpdateLoading(false)
    }
  }

  const deleteItem = async () => {
    setDeleteLoading(true)
    try {
      await deleteTodoAction({
        id,
      })
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardAction>
          <Button
            onClick={toggleCompleted}
            variant={completed ? "outline" : "default"}
            disabled={updateLoading}
          >
            {updateLoading
              ? "Cargando..."
              : completed
                ? "Completado"
                : "Completar"}
          </Button>
          <Button
            onClick={deleteItem}
            variant={"destructive"}
            disabled={deleteLoading}
          >
            {deleteLoading ? "Eliminando..." : "Eliminar"}
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  )
}
