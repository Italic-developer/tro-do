"use client"


import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
    Card,
    CardContent,

    CardFooter,

} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,

} from "@/components/ui/chart"
import { useTodo } from "./TodoProvider";


const chartConfig = {
    complete: {
        label: "complete",
        color: "var(--chart-3)",
    },
    incomplete: {
        label: "incomplete",
        color: "var(--chart-1)",
    },
    critical: {
        label: "critical",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function ChartRadialStacked() {
    const { todos } = useTodo()
    const complete = todos.filter((todo) => (todo.status == "Completed")).length
    const incomplete = todos.filter((todo) => (todo.status == "Pending")).length
    const critical = todos.filter((todo) => (todo.status == "Critical")).length
    const totalTasks = complete + incomplete + critical
    return (
        <Card className="flex flex-col justify-center items-center w-3/5  ml-auto bg-inherit shadow-transparent p-3 border-none  ">

            <CardContent className="p-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto w-full max-w-62.5 h-32"
                >
                    <RadialBarChart
                        data={
                            [{
                                complete, incomplete, critical
                            }]
                        }
                        endAngle={180}
                        innerRadius={80}
                        outerRadius={130}
                        cy={"95%"}
                    >

                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 16}
                                                    className=" text-2xl  font-bold"
                                                    style={{ fill: "var(--color-ring)" }}
                                                >
                                                    {totalTasks.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 4}
                                                    className="text-foreground"
                                                    style={{ fill: "var(--color-ring)" }}
                                                >
                                                    Tasks
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                        {["complete", "incomplete", "critical"].map((status,) => (
                            <RadialBar
                                key={status}
                                dataKey={status}
                                stackId="a"

                                fill={`var(--color-${status})`}
                                className="stroke-inherit stroke-3"
                            />))}

                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex justify-center gap-4 pt-1 p-0 text-sm">
                {[
                    { key: "3", label: "Complete" },
                    { key: "1", label: "Incomplete" },
                    { key: "2", label: "Critical" },
                ].map((item) => (
                    <div key={item.key} className="flex items-center gap-1.5">
                        <span
                            className={`size-2.5 rounded-full `}
                            style={{
                                backgroundColor: `var(--chart-${item.key})`,
                            }}
                        />
                        <span className="text-muted-foreground">
                            {item.label}
                        </span>
                    </div>
                ))}
            </CardFooter>
        </Card >
    )
}
