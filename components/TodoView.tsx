import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
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
import { Todo } from "@/lib/types";
import { SquareArrowOutUpRight, X } from "lucide-react";

function TodoView({ todo }: { todo: Todo }) {

    const { setTodos } = useTodo()
    const [subTasksInput, setSubTaskInput] = useState("")
    const [open, setOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const form = useForm<z.infer<typeof formschema>>({
        resolver: zodResolver(formschema),

        defaultValues: {
            name: todo.title,
            description: todo.description,
            dueDate: todo.dueDate,
            priority: todo.priority,
            subTasks: todo.subTasks
        },
    })

    function onSubmit(values: z.infer<typeof formschema>) {

        setTodos(prev => prev.map(t => t.id === todo.id ? {
            ...t,
            title: values.name,
            description: values.description,
            dueDate: values.dueDate,
            priority: values.priority,
            subTasks: values.subTasks
        } :
            t))

        setSubTaskInput("")
        setIsEditing(false)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" size="icon" className="hover:bg-secondary/40" title="View">
                    <SquareArrowOutUpRight />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="space-y-3 pb-2">
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                            <DialogTitle className="text-2xl font-bold tracking-tight">
                                Task Details
                            </DialogTitle>

                            <DialogDescription>
                                View and edit the details of this task.
                            </DialogDescription>
                        </div>

                        <span
                            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold
                    ${todo.status === "Pending"
                                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                                    : todo.status === "Completed"
                                        ? "bg-green-500/15 text-green-600 dark:text-green-400"
                                        : "bg-red-500/15 text-red-600 dark:text-red-400"
                                }`}
                        >
                            {todo.status}
                        </span>
                    </div>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Main Details */}
                        <div className="rounded-xl border bg-muted/20 p-4 space-y-5">
                            <div>
                                <p className="text-sm font-semibold">Task Information</p>
                                <p className="text-xs text-muted-foreground">
                                    The basic details of your task.
                                </p>
                            </div>

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
                                                disabled={!isEditing}
                                                className="bg-background"
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
                                                className="resize-none bg-background min-h-24"
                                                {...field}
                                                disabled={!isEditing}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Due Date + Priority */}
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_auto] items-start">
                                <FormField
                                    control={form.control}
                                    name="dueDate"
                                    render={({ field }) => (
                                        <DatePicker
                                            field={field}
                                            editing={isEditing}
                                        />
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
                                                    disabled={!isEditing}
                                                >
                                                    <SelectTrigger className="w-full sm:w-32 bg-background">
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
                        </div>

                        {/* Subtasks */}
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
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <FormLabel className="text-sm font-semibold">
                                                    Sub Tasks
                                                </FormLabel>

                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Break this task into smaller steps.
                                                </p>
                                            </div>

                                            {field.value.length > 0 && (
                                                <span className="text-xs text-muted-foreground">
                                                    {field.value.length}{" "}
                                                    {field.value.length === 1
                                                        ? "task"
                                                        : "tasks"}
                                                </span>
                                            )}
                                        </div>

                                        <FormControl>
                                            <div className="space-y-3">
                                                {field.value.length > 0 ? (
                                                    <ul className="space-y-2">
                                                        {field.value.map((subtask, id) => (
                                                            <li
                                                                key={id}
                                                                className="group flex items-center gap-3 rounded-lg border bg-muted/20 px-3 py-2.5 transition-colors hover:bg-muted/40"
                                                            >
                                                                <div className="size-2 shrink-0 rounded-full bg-primary/60" />

                                                                <span className="flex-1 text-sm">
                                                                    {subtask}
                                                                </span>

                                                                <Button
                                                                    type="button"
                                                                    size="icon"
                                                                    variant="ghost"
                                                                    disabled={!isEditing}
                                                                    className="size-7 opacity-60 hover:opacity-100"
                                                                    onClick={() => {
                                                                        const updated = [
                                                                            ...field.value
                                                                        ]

                                                                        updated.splice(id, 1)

                                                                        field.onChange(
                                                                            updated
                                                                        )
                                                                    }}
                                                                    aria-label="Remove subtask"
                                                                >
                                                                    <X className="size-4" />
                                                                </Button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <div className="rounded-lg border border-dashed px-4 py-6 text-center">
                                                        <p className="text-sm text-muted-foreground">
                                                            No subtasks yet.
                                                        </p>
                                                    </div>
                                                )}

                                                {isEditing && (
                                                    <div className="flex gap-2">
                                                        <Input
                                                            placeholder="Add a subtask..."
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
                                                            className="bg-background"
                                                        />

                                                        <Button
                                                            type="button"
                                                            onClick={addSubTask}
                                                        >
                                                            Add
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                        {/* Actions */}
                        <div className="flex gap-2 border-t pt-4">
                            {isEditing && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => {
                                        form.reset({
                                            name: todo.title,
                                            description: todo.description,
                                            dueDate: todo.dueDate,
                                            priority: todo.priority,
                                            subTasks: todo.subTasks
                                        })

                                        setSubTaskInput("")
                                        setIsEditing(false)
                                    }}
                                >
                                    Cancel
                                </Button>
                            )}

                            <Button
                                type={isEditing ? "submit" : "button"}
                                className="flex-1"
                                onClick={(e) => {
                                    if (!isEditing) {
                                        e.preventDefault()
                                        setIsEditing(true)
                                    }
                                }}
                            >
                                {isEditing ? "Save Changes" : "Edit Task"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default TodoView
