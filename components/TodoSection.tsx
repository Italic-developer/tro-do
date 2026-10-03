"use client"
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Create from "./Create";
import { useTodo } from "./TodoProvider";
import TodoCard from "./TodoCard";

function Todos() {

    const searchParams = useSearchParams()
    const router = useRouter()
    const search: "Completed" | "Pending" | "Critical" | "All Tasks" | null = searchParams.get('status') as "Completed" | "Pending" | "Critical" | "All Tasks" | null;
    const { todos, setTodos } = useTodo()
    const filteredTodos = todos.filter(todo => todo.status === search || !search)

    return (
        <div className="flex flex-col gap-6 px-3 py-4">

            <div className="flex  gap-3 flex-row items-center justify-between">
                <div className="flex gap-2 w-36 overflow-x-auto pb-1 [mask-image:linear-gradient(to_right,black_85%,transparent_100%)]">
                    {["All Tasks", "Completed", "Pending", "Critical",].map((status) => (
                        <Button key={status}
                            onClick={() => {
                                if (status == "All Tasks") {
                                    router.push("/")
                                } else {
                                    router.push(`/?status=${status}`)
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



            <div className="bg-card text-card-foreground p-5 border rounded-xl">
                <h2 className="font-semibold text-2xl sm:text-3xl mb-5">
                    Your Tasks
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredTodos.length > 0 ? (filteredTodos.map((todo) => (
                        <TodoCard key={todo.id} todo={todo} setTodos={setTodos} />
                    ))) : (
                        <h2 className="text-lg font-light text-muted-foreground  text-center p-3">You&rsquo;re Safe, for Now ...</h2>
                    )}
                </div>
            </div>


        </div>


    );
}

export default Todos;
