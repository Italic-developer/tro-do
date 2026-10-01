import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CalendarIcon, PlusCircle, X } from "lucide-react"
import { parseDate } from "chrono-node"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useTodo } from "./TodoProvider"
import DatePicker from "./DatePicker";
import { formschema } from "@/lib/schemas";

function Create() {

    const { setTodos } = useTodo()
    const [subTasksInput, setSubTaskInput] = useState("")
    const [reset, setReset] = useState(false)

    const form = useForm<z.infer<typeof formschema>>({
        resolver: zodResolver(formschema),

        defaultValues: {
            name: "",
            description: "",
            dueDate: new Date(),
            priority: "Low",
            subTasks: []
        },
    })

    function onSubmit(values: z.infer<typeof formschema>) {
        console.log(values)

        setTodos(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                title: values.name,
                description: values.description,
                dueDate: values.dueDate,
                priority: values.priority,
                subTasks: values.subTasks,
                status: "Pending"
            }
        ])
        form.reset()
        setSubTaskInput("")
        setReset(true)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="secondary"
                    size="lg"
                    className="bg-primary text-white hover:bg-primary/90 active:scale-95 transition-transform"
                >
                    <PlusCircle className="mr-2" />
                    <span>Add Task</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="flex flex-col gap-4 ">
                <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>

                    <DialogDescription>
                        Fill in the details for your upcoming task to stay organized.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Task Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task Name</FormLabel>

                                    <FormControl>
                                        <Input
                                            placeholder="eg: Buy Groceries with Alex at 4"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>

                                    <FormControl>
                                        <Textarea
                                            placeholder="Provide some more context about your task..."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Due Date + Priority */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto] items-start">
                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <DatePicker field={field} reset />
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Priority</FormLabel>

                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className="w-full sm:w-32">
                                                    <SelectValue placeholder="Priority" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {["Low", "Medium", "High"].map(
                                                        (priority) => (
                                                            <SelectItem
                                                                key={priority}
                                                                value={priority}
                                                            >
                                                                {priority}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Sub Tasks */}
                        <FormField
                            control={form.control}
                            name="subTasks"
                            render={({ field }) => {
                                const addSubTask = () => {
                                    const value = subTasksInput.trim()

                                    if (!value) return

                                    field.onChange([
                                        ...field.value,
                                        value
                                    ])

                                    setSubTaskInput("")
                                }

                                return (
                                    <FormItem>
                                        <FormLabel>Sub Tasks</FormLabel>

                                        <FormControl>
                                            <div className="flex flex-col gap-3">
                                                {field.value.length > 0 && (
                                                    <ul className="flex flex-col gap-2">
                                                        {field.value.map(
                                                            (subtask, idx) => (
                                                                <li
                                                                    key={idx}
                                                                    className="flex items-center gap-2 rounded-md border px-3 py-2"
                                                                >
                                                                    <span className="flex-1 text-sm">
                                                                        {subtask}
                                                                    </span>

                                                                    <Button
                                                                        type="button"
                                                                        size="icon"
                                                                        variant="ghost"
                                                                        className="size-7"
                                                                        onClick={() => {
                                                                            const updated = [
                                                                                ...field.value
                                                                            ]

                                                                            updated.splice(idx, 1)

                                                                            field.onChange(
                                                                                updated
                                                                            )
                                                                        }}
                                                                        aria-label="Remove subtask"
                                                                    >
                                                                        <X className="size-4" />
                                                                    </Button>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                )}

                                                <div className="flex gap-2">
                                                    <Input
                                                        placeholder="Add subtask"
                                                        value={subTasksInput}
                                                        onChange={(e) =>
                                                            setSubTaskInput(
                                                                e.target.value
                                                            )
                                                        }
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                e.preventDefault()
                                                                addSubTask()
                                                            }
                                                        }}
                                                    />

                                                    <Button
                                                        type="button"
                                                        onClick={addSubTask}
                                                    >
                                                        Add
                                                    </Button>
                                                </div>
                                            </div>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                        <Button type="submit" className="w-full">
                            Create Task
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default Create
