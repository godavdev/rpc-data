"use client"

import { useEffect } from "react"
import { listTodos } from "./data/todos.data"

const HomePage = () => {

  useEffect(()=>{
    const getData = async () => {
      const res = await listTodos()
      console.log(res)
    }
    getData()
  }, [])

  return (
    <div>HomePage</div>
  )
}

export default HomePage