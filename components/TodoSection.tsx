"use client"
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Create from "./Create";
import { useTodo } from "./TodoProvider";
import TodoCard from "./TodoCard";
import { Todo } from "@/lib/types";
import { ListTodo } from "lucide-react";
import { useState } from "react";

function Todos() {

    const searchParams = useSearchParams()
    const router = useRouter()

    const search: "Completed" | "Pending" | "Critical" | "All Tasks" | null = searchParams.get('status') as "Completed" | "Pending" | "Critical" | "All Tasks" | null;
    const { todos, setTodos } = useTodo()
    const filteredTodos = todos.filter(todo => todo.status === search || !search)
    const [searching, setSearching] = useState(false)
    return (
        <div className="flex flex-col gap-6 px-3 py-4">

            <div className="flex  gap-3 flex-row items-center justify-between">
                <div className="flex w-full gap-2 overflow-x-auto pb-1 [mask-image:linear-gradient(to_right,black_85%,transparent_100%)] md:overflow-visible md:[mask-image:none]">
                    {["All Tasks", "Completed", "Pending", "Critical",].map((status) => (
                        <Button key={status}
                            onClick={() => {
                                if (status == "All Tasks") {
                                    router.push("/")
                                    setSearching(false)
                                } else {
                                    router.push(`/?status=${status}`)
                                    setSearching(true)
                                }
                            }}
                            variant="secondary" size="sm" className={`shrink-0 hover:bg-secondary/40 ${status === search && "bg-secondary text-secondary-foreground"
                                }`}>
                            {status}
                        </Button>
                    ))}

                </div>
                <Create />
            </div>



            <div className="overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm">
                <div className="flex items-center justify-between border-b px-5 py-4 sm:px-6">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Your Tasks
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Keep track of what needs doing.
                        </p>
                    </div>

                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        {todos.length} {todos.length === 1 ? "task" : "tasks"}
                    </span>
                </div>

                <div className="p-5 sm:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {filteredTodos.length > 0 ? (filteredTodos.map((todo) => (
                            <TodoCard key={todo.id} todo={todo} setTodos={setTodos} />
                        ))) : (
                            <div className="col-span-full flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 px-6 py-12 text-center">
                                <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <ListTodo className="size-7" />
                                </div>

                                <h3 className="text-xl font-semibold tracking-tight">
                                    {todos.length === 0
                                        ? "Nothing here yet."
                                        : `No ${search?.toLowerCase()} tasks.`
                                    }
                                </h3>

                                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                                    {todos.length === 0
                                        ? "Your task list is suspiciously empty. Create your first task and let's give it something to do."
                                        : `You don't have any ${search?.toLowerCase()} tasks right now.`
                                    }
                                </p>

                                <div className="mt-6">
                                    <Create />
                                </div>
                            </div>
                        )}
                    </div>
                </div>


            </div>

        </div>
    );
}

export default Todos;
