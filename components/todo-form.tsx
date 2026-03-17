"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createTodoAction } from "@/app/data/todos.actions"
import { orpc } from "@/app/libs/orcp.client"

const todoFormSchema = z.object({
  name: z
    .string()
    .min(5, "El nombre del todo debe tener al menos 5 caracteres.")
    .max(20, "El nombre del todo debe tener como máximo 20 caracteres."),
})

export function TodoForm() {
  const form = useForm({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(data: z.infer<typeof todoFormSchema>) {
    try {
      // await createTodoAction(data)
      await orpc.todos.create({ name: data.name })

      form.reset()
    } catch (error) {
      console.error("Error al crear el todo:", error)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Crear Todo</CardTitle>
        <CardDescription>
          Crea un nuevo todo para agregarlo a tu lista.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-rhf-demo"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Nombre del Todo</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Nombre del Todo"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="form-rhf-demo"
          >
            Crear
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
