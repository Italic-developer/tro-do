"use client"
import { mockTodos, Todo } from "@/lib/Todos";
import React, { createContext, useContext, useEffect, useState } from "react"

interface TodoContextType {
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export function TodoProvider({ children }: { children: React.ReactNode }) {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("todos") == "[]") {
            console.log("todos")
            //TODO Remove this when in prod
            localStorage.setItem("todos", JSON.stringify(mockTodos));
            setTodos(mockTodos || "[]");
        }

        const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
        if (storedTodos) {
            const parsedTodos = storedTodos.map((todo: Todo) => {
                return {
                    ...todo,
                    dueDate: new Date(todo.dueDate)
                }
            })
            setTodos(parsedTodos)
            setLoaded(true)
        }
    }, [])

    useEffect(() => {
        if (!loaded) return
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [loaded, todos])
    return (<TodoContext.Provider value={{ todos, setTodos }}>
        {children}
    </TodoContext.Provider>)
}

export function useTodo() {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error("TodoContext must be used inside MTodoProvider")
    }

    return context
}
