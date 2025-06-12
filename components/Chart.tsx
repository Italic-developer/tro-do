"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radial chart with stacked sections"

const chartData = [{ complete: 5, incomplete: 28 }]

const chartConfig = {
    complete: {
        label: "complete",
        color: "var(--chart-3)",
    },
    incomplete: {
        label: "incomplete",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ChartRadialStacked() {
    const totalTasks = chartData[0].complete + chartData[0].incomplete

    return (
        <Card className="flex flex-col justify-center w-3/5 ml-auto bg-inherit shadow-transparent p-3 border-none  ">

            <CardContent className="flex flex-1 items-center text-muted-foreground -mb-32">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        endAngle={180}
                        innerRadius={80}
                        outerRadius={130}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
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
                        <RadialBar
                            dataKey="complete"
                            stackId="a"
                            cornerRadius={5}
                            fill="var(--color-complete)"
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="incomplete"
                            fill="var(--color-incomplete)"
                            stackId="a"
                            cornerRadius={5}
                            className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="text-muted-foreground leading-none">
                    Showing total Tasks Based on Completion
                </div>
            </CardFooter>
        </Card>
    )
}
