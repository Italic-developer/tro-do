"use client"

import { getTodoMessage } from "@/lib/utils";
import { ChartRadialStacked } from "./Chart"
import { useTodo } from "./TodoProvider";
import { useMemo } from "react";

export default function Header() {
    const { todos } = useTodo()

    const complete = todos.filter(
        (todo) => todo.status === "Completed"
    ).length

    const message = useMemo(
        () => getTodoMessage(complete, todos.length),
        [complete, todos.length]
    )

    return (
        <div className="flex flex-col md:flex-row gap-5 bg-accent p-4 rounded-md m-3 items-center justify-center">

            <div className="flex flex-col gap-2 p-4 m-3 text-center">
                <h2 className="font-semibold text-3xl">
                    Welcome back,{" "}
                    <span className="text-primary font-bold text-4xl">
                        Patrick
                    </span>
                </h2>

                <p className="font-light text-lg text-muted-foreground">
                    {message}
                </p>

                <p className="text-sm text-muted-foreground">
                    {complete} of {todos.length} tasks completed
                </p>
            </div>

            {todos.length > 0 && <ChartRadialStacked />}

        </div>
    );
}
