import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react";
import { parseDate } from "chrono-node"
import { CalendarIcon } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Calendar } from "@/components/ui/calendar"

import { Label } from "@/components/ui/label"
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
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import React, { useState } from "react";


function Create() {
    function formatDateTime(date: Date | undefined) {
        if (!date) return "";
        return date.toLocaleString("en-US", {
            dateStyle: "full",
            timeStyle: "short",
        });
    }

    const formschema = z.object({
        name: z.string()
            .max(50, "Too long.")
            .refine(val => val.trim().split(/\s+/).length <= 6, {
                message: "Must be 6 words or fewer"
            }),
        description: z.string()
            .max(250, "Too long.")
            .refine(val => val.trim().split(/\s+/).length <= 30, {
                message: "Must be 30 words or fewer"
            }),
        dueDate: z.date().refine(val => val instanceof Date && !isNaN(val.getTime()), { message: "Please Input A valid Date" }
        ),
        priority: z.enum(["Low", "Medium", "High"]),
        subTasks: z.array(z.string())
    })
    const [subTasks, setSubTasks] = useState([])
    const form = useForm<z.infer<typeof formschema>>({
        resolver: zodResolver(formschema),
        defaultValues: {
            name: "",
            description: "",
            dueDate: new Date(),
            priority: "Low",
            subTasks: subTasks
        },
    })
    function onSubmit(values: z.infer<typeof formschema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="secondary" size="lg" className="bg-primary text-white hover:bg-primary/90 hover:scale-95 transition-transform">
                    <PlusCircle className="mr-2" />
                    <span>Add Task</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="flex-col flex gap-4">
                <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>
                        Fill in the details for your upcoming task to stay organized.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg: Buy Groceries with Alex at 4" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Provide some more context about your task ..." {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-row justify-evenly items-center w-full">
                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => {
                                    const [inputVal, setInputVal] = useState(() =>
                                        field.value ? formatDateTime(field.value) : ""
                                    );
                                    const [open, setOpen] = useState(false);
                                    const [isInvalid, setIsInvalid] = useState(false);
                                    const parsedDate = parseDate(inputVal || "");


                                    const handleInputChange = (val: string) => {
                                        setInputVal(val);
                                        const parsed = parseDate(val);
                                        if (parsed) {
                                            setIsInvalid(false);
                                            field.onChange(parsed);
                                        } else {
                                            setIsInvalid(true); // show live error
                                        }
                                    };
                                    return (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Due Date</FormLabel>
                                            <div className="relative flex gap-2">
                                                <Input
                                                    placeholder="Next Friday at 5pm"
                                                    value={inputVal}
                                                    onChange={(e) => handleInputChange(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "ArrowDown") {
                                                            e.preventDefault();
                                                            setOpen(true);
                                                        }
                                                    }}
                                                />
                                                <Popover open={open} onOpenChange={setOpen}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                                                        >
                                                            <CalendarIcon className="size-3.5" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="end">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            month={field.value ?? undefined} // Auto-focus calendar
                                                            onMonthChange={() => { }}
                                                            onSelect={(date) => {
                                                                if (date) {
                                                                    const newDate = new Date(date);
                                                                    newDate.setHours(
                                                                        field.value?.getHours() ?? 0,
                                                                        field.value?.getMinutes() ?? 0
                                                                    );
                                                                    field.onChange(newDate);
                                                                    setInputVal(formatDateTime(newDate));
                                                                    setOpen(false);
                                                                }
                                                            }}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                            <FormDescription className="text-xs italic text-muted-foreground mt-1">
                                                Parsed:{" "}
                                                <span className="font-semibold">
                                                    {field.value ? formatDateTime(field.value) : "N/A"}
                                                </span>
                                                {isInvalid && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        Couldn't understand that — try something like "next Monday at 3pm".
                                                    </p>
                                                )}

                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="description"

                                render={({ field }) => (
                                    <FormItem className="-mt-7">
                                        <FormLabel>Priority</FormLabel>
                                        <FormControl>
                                            <Select>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Priority" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {["Low", "Medium", "High"].map((priority) => (
                                                        <SelectItem className="p-2 " key={priority}


                                                            value={priority}>{priority}

                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="subTasks"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sub Tasks</FormLabel>
                                    <FormControl>
                                        <div className="flex flex-col gap-2">
                                            {field.value && field.value.length > 0 && (
                                                <ul className="mb-2">
                                                    {field.value.map((subtask: string, idx: number) => (
                                                        <li key={idx} className="flex items-center gap-2">
                                                            <span className="flex-1">{subtask}</span>
                                                            <Button
                                                                type="button"
                                                                size="icon"
                                                                variant="ghost"
                                                                onClick={() => {
                                                                    const updated = [...field.value];
                                                                    updated.splice(idx, 1);
                                                                    field.onChange(updated);
                                                                }}
                                                                aria-label="Remove subtask"
                                                            >
                                                                ×
                                                            </Button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="Add subtask"
                                                    value={subTasks.input || ""}
                                                    onChange={e => setSubTasks({ ...subTasks, input: e.target.value })}
                                                    onKeyDown={e => {
                                                        if (e.key === "Enter" && subTasks.input?.trim()) {
                                                            field.onChange([...(field.value || []), subTasks.input.trim()]);
                                                            setSubTasks({ ...subTasks, input: "" });
                                                        }
                                                    }}
                                                />
                                                <Button
                                                    type="button"
                                                    onClick={() => {
                                                        if (subTasks.input?.trim()) {
                                                            field.onChange([...(field.value || []), subTasks.input.trim()]);
                                                            setSubTasks({ ...subTasks, input: "" });
                                                        }
                                                    }}
                                                >
                                                    Add
                                                </Button>
                                            </div>
                                        </div>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default Create;