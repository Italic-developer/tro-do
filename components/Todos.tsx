"use client"
import { Calendar, CircleCheck, PencilIcon, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Create from "./Create";

interface Todo {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    priority: "Low" | "Medium" | "High";
    status: "Completed" | "Pending" | "Critical";

}


const todos: Todo[] = [
    {
        id: 1,
        title: "Project meeting with John",
        description: "Discuss the project goals, objectives, timelines, and budget with John.",
        dueDate: new Date("2023-03-15"),
        priority: "High",
        status: "Pending",


    },
    {
        id: 2,
        title: "Buy groceries",
        description: "Pick up essentials like milk, eggs, and bread.",
        dueDate: new Date("2023-03-16"),
        priority: "Low",
        status: "Completed",

    },
    {
        id: 3,
        title: "Fix app bug",
        description: "Identify and fix the bug causing crashes.",
        dueDate: new Date("2023-03-17"),
        priority: "Medium",
        status: "Critical",

    },
    {
        id: 4,
        title: "Buy household items",
        description: "Toilet paper, trash bags, paper towels, etc.",
        dueDate: new Date(2023, 10, 5),
        priority: "High",
        status: "Pending",

    },
    {
        id: 5,
        title: "Annual check-up",
        description: "Doctor visit and vaccines if needed.",
        dueDate: new Date(2023, 10, 10),
        priority: "Medium",
        status: "Completed",

    },
    {
        id: 6,
        title: "Submit project report",
        description: "Final review and submission.",
        dueDate: new Date(2023, 10, 12),
        priority: "Low",
        status: "Pending",

    },

];

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
    const [todoList, setTodoList] = useState<Todo[]>(todos);
    const upcomingTodos = todoList.filter(todo => daysToDeadline(todo.dueDate) < 5 && todo.status !== "Completed");
    return (
        <div className="flex flex-col gap-6 px-3 py-4">

            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    {["All Tasks", "Completed", "Pending", "Critical ",].map((status) => (
                        <Button key={status}
                            onClick={() => {
                                router.push(`/?status=${status}`)
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
                        {search === "All Tasks" ?
                            todoList.map((todo, index) => (
                                <Card key={todo.id}>
                                    <CardHeader className="flex justify-between items-start">
                                        <CardTitle className="text-2xl font-bold">{todo.title}</CardTitle>
                                        <span className={`text-white rounded-full px-4 py-1 text-sm font-bold
                                        ${todo.status === "Pending" ? "bg-amber-500" :
                                                todo.status === "Completed" ? "bg-green-600" : "bg-red-600"}`}>
                                            {todo.status}
                                        </span>
                                    </CardHeader>
                                    <CardDescription className="flex flex-col p-4 gap-3 text-muted-foreground">
                                        <span>{todo.description}</span>
                                        <span className="flex items-center gap-2 text-sm">
                                            <Calendar className="text-red-400 w-4 h-4" />
                                            Due: {todo.dueDate.toDateString()}
                                        </span>
                                    </CardDescription>
                                    <CardFooter className="flex justify-between items-center p-4 pt-0">
                                        <span className={`text-white rounded-sm px-2 py-1 text-xs font-bold
                                        ${todo.priority === "High" ? "bg-red-500" :
                                                todo.priority === "Medium" ? "bg-orange-400" : "bg-green-500"}`}>
                                            {todo.priority} Priority
                                        </span>
                                        <div className="flex items-center gap-1">
                                            {todo.status !== "Completed" && (
                                                <Button onClick={() => {
                                                    setTodoList(prev =>
                                                        prev.map(t =>
                                                            t.id === todo.id ? { ...t, status: "Completed" } : t
                                                        )
                                                    );
                                                }} variant="secondary" size="icon" className="hover:bg-secondary/40" title="Mark as completed">
                                                    <CircleCheck className="text-green-500" />
                                                </Button>
                                            )}
                                            <Button variant="secondary" size="icon" className="hover:bg-secondary/40" title="Edit">
                                                <PencilIcon />
                                            </Button>
                                            <Button onClick={() => {
                                                setTodoList(prev => prev.filter(t => t.id !== todo.id));
                                            }} variant="secondary" size="icon" className="hover:bg-secondary/40" title="Delete">
                                                <Trash2 className="text-red-500" />
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            )) : todoList.filter(todo => todo.status === search || search === null).map((todo, index) => (
                                <Card key={todo.id}>
                                    <CardHeader className="flex justify-between items-start">
                                        <CardTitle className="text-2xl font-bold">{todo.title}</CardTitle>
                                        <span className={`text-white rounded-full px-4 py-1 text-sm font-bold
                                        ${todo.status === "Pending" ? "bg-amber-500" :
                                                todo.status === "Completed" ? "bg-green-600" : "bg-red-600"}`}>
                                            {todo.status}
                                        </span>
                                    </CardHeader>
                                    <CardDescription className="flex flex-col p-4 gap-3 text-muted-foreground">
                                        <span>{todo.description}</span>
                                        <span className="flex items-center gap-2 text-sm">
                                            <Calendar className="text-red-400 w-4 h-4" />
                                            Due: {todo.dueDate.toDateString()}
                                        </span>
                                    </CardDescription>
                                    <CardFooter className="flex justify-between items-center p-4 pt-0">
                                        <span className={`text-white rounded-sm px-2 py-1 text-xs font-bold
                                        ${todo.priority === "High" ? "bg-red-500" :
                                                todo.priority === "Medium" ? "bg-orange-400" : "bg-green-500"}`}>
                                            {todo.priority} Priority
                                        </span>
                                        <div className="flex items-center gap-1">
                                            {todo.status !== "Completed" && (
                                                <Button onClick={() => {
                                                    setTodoList(prev =>
                                                        prev.map(t =>
                                                            t.id === todo.id ? { ...t, status: "Completed" } : t
                                                        )
                                                    );
                                                }} variant="secondary" size="icon" className="hover:bg-secondary/40" title="Mark as completed">
                                                    <CircleCheck className="text-green-500" />
                                                </Button>
                                            )}
                                            <Button variant="secondary" size="icon" className="hover:bg-secondary/40" title="Edit">
                                                <PencilIcon />
                                            </Button>
                                            <Button onClick={() => {
                                                setTodoList(prev => prev.filter(t => t.id !== todo.id));
                                            }} variant="secondary" size="icon" className="hover:bg-secondary/40" title="Delete">
                                                <Trash2 className="text-red-500" />
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                    </div>
                </div>
                <div className="bg-card text-card-foreground p-4 border rounded-md w-2/6 gap-3 flex flex-col">
                    <h2 className="font-semibold text-3xl mb-4">Upcoming Deadlines</h2>

                    {upcomingTodos.length > 0 ? (
                        upcomingTodos.map(todo => (
                            <Card key={todo.id}>
                                <CardHeader className="flex justify-between items-start">
                                    <CardTitle className="text-2xl font-bold">{todo.title}</CardTitle>
                                    <span className={`text-white rounded-full px-4 py-1 text-sm font-bold
                            ${todo.status === "Pending" ? "bg-amber-500" :
                                            todo.status === "Completed" ? "bg-green-600" : "bg-red-600"}`}>
                                        {todo.status}
                                    </span>
                                </CardHeader>
                                <CardDescription className="flex flex-col p-4 gap-3 text-muted-foreground">
                                    <span className="flex items-center gap-2 text-sm">
                                        <Calendar className="text-red-400 w-4 h-4" />
                                        Due: {todo.dueDate.toDateString()}
                                    </span>
                                </CardDescription>
                            </Card>
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
