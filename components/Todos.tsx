"use client"
import { Calendar, CircleCheck, PencilIcon, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Create from "./Create";
import { useTodo } from "./TodoProvider";
import TodoCard from "./TodoCard";

function Todos() {
    const daysToDeadline = (deadline: Date) => {
        const today = new Date();
        const timeDiff = deadline.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return daysDiff;
    }
    const searchParams = useSearchParams()
    const router = useRouter()
    const search: "Completed" | "Pending" | "Critical" | "All Tasks" | null = searchParams.get('status') as "Completed" | "Pending" | "Critical" | "All Tasks" | null;

    const { todos, setTodos } = useTodo()
    console.log(todos)
    const upcomingTodos = todos.filter(todo => daysToDeadline(todo.dueDate) < 5 && todo.status !== "Completed");
    return (
        <div className="flex flex-col gap-6 px-3 py-4">

            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    {["All Tasks", "Completed", "Pending", "Critical ",].map((status) => (
                        <Button key={status}
                            onClick={() => {
                                status == "All Tasks" ? router.push("/") : router.push(`/?status=${status}`)
                            }}
                            variant="secondary" size="sm" className={`hover:bg-secondary/40 ${status === search && "bg-secondary text-secondary-foreground"} `}>
                            {status}
                        </Button>
                    ))}

                </div>
                <Create />
            </div>


            <div className="flex flex-row gap-4">
                <div className="bg-card text-card-foreground p-4 border rounded-md w-4/6">
                    <h2 className="font-semibold text-3xl mb-4">Your Tasks</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {todos.filter(todo => todo.status === search || !search).map((todo, index) => (
                            <TodoCard key={todo.id} todo={todo} setTodos={setTodos} />
                        ))}
                    </div>
                </div>
                <div className="bg-card text-card-foreground p-4 border rounded-md w-2/6 gap-3 flex flex-col">
                    <h2 className="font-semibold text-3xl mb-4">Upcoming Deadlines</h2>

                    {upcomingTodos.length > 0 ? (
                        upcomingTodos.map(todo => (
                            <TodoCard key={todo.id} todo={todo} setTodos={setTodos} />
                        ))
                    ) : (
                        <h2 className="text-lg font-light text-muted-foreground  text-center p-3">You're Safe, for Now ...</h2>
                    )}
                </div>

            </div>
        </div>

    );
}

export default Todos;
