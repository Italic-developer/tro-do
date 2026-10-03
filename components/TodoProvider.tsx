"use client"
import { Todo } from "@/lib/types";
import { isCrit } from "@/lib/utils";
import React, { createContext, useContext, useEffect, useState } from "react"
import { DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";

interface TodoContextType {
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    name: string
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export function TodoProvider({ children }: { children: React.ReactNode }) {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [name, setName] = useState("");
    const [draftName, setDraftName] = useState("");

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
        if (storedTodos) {
            const parsedTodos = storedTodos.map((todo: Todo) => {
                return {
                    ...todo,
                    dueDate: new Date(todo.dueDate),
                    status: isCrit(todo)
                }
            })
            setTodos(parsedTodos)
            setLoaded(true)
        }

        const storedName = localStorage.getItem("name") || "";
        if (storedName) {
            setName(storedName);
            setDraftName(storedName);
        }
    }, [])

    useEffect(() => {
        if (!loaded) return
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [loaded, todos])

    useEffect(() => {
        if (!name.trim()) {
            localStorage.removeItem("name");
            return;
        }

        localStorage.setItem("name", name.trim());
    }, [name])

    const handleNameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nextName = draftName.trim();

        if (!nextName) return;

        setName(nextName);
    };

    return (
        <TodoContext.Provider value={{ todos, setTodos, name }}>
            <Dialog open={!name.trim()}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="gap-2">
                        <DialogTitle className="text-2xl"> Welcome to Tro-do </DialogTitle>
                        <DialogDescription className="text-base"> Before we get started, what should we call you? </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleNameSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-medium"> Your name </label>
                            <input
                                id="name"
                                type="text"
                                value={draftName}
                                onChange={(e) => setDraftName(e.target.value)}
                                placeholder="e.g. John Doe"
                                autoFocus
                                className="h-10 rounded-md border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <button type="submit" disabled={!draftName.trim()} className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"> Done </button>
                    </form>
                </DialogContent>
            </Dialog>
            {children}
        </TodoContext.Provider>
    )
}

export function useTodo() {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error("TodoContext must be used inside TodoProvider")
    }

    return context
}
