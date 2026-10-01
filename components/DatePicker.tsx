"use client"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { parseDate } from 'chrono-node';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ControllerRenderProps } from 'react-hook-form';
import { z } from 'zod';
import { formschema } from '@/lib/schemas';

function DatePicker({ field, reset }: { field: ControllerRenderProps<z.infer<typeof formschema>, "dueDate">, reset: boolean }) {
    function formatDateTime(date: Date | undefined) {
        if (!date) return ""

        return date.toLocaleString("en-US", {
            dateStyle: "full",
            timeStyle: "short",
        })
    }

    const [inputVal, setInputVal] = useState(() =>
        field.value
            ? formatDateTime(field.value)
            : ""
    )

    const [open, setOpen] = useState(false)
    const [isInvalid, setIsInvalid] = useState(false)

    const handleInputChange = (val: string) => {
        setInputVal(val)

        if (!val.trim()) {
            setIsInvalid(false)
            return
        }

        const parsed = parseDate(val)

        if (parsed) {
            setIsInvalid(false)
            field.onChange(parsed)
        } else {
            setIsInvalid(true)
        }
    }
    useEffect(() => {
        reset ? setInputVal("") : null;
    }, [field.value])

    return (
        <FormItem className="flex flex-col">
            <FormLabel>Due Date</FormLabel>

            <div className="relative">
                <Input
                    placeholder="Next Friday at 5pm"
                    value={inputVal}
                    onChange={(e) =>
                        handleInputChange(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault()
                            setOpen(true)
                        }
                    }}
                    className="pr-10"
                />

                <Popover
                    open={open}
                    onOpenChange={setOpen}
                >
                    <PopoverTrigger asChild>
                        <Button
                            type="button"
                            variant="ghost"
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        >
                            <CalendarIcon className="size-3.5" />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent
                        className="w-auto p-0"
                        align="end"
                    >
                        <Calendar
                            mode="single"
                            selected={field.value}
                            month={field.value ?? undefined}
                            onMonthChange={() => { }}
                            onSelect={(date) => {
                                if (date) {
                                    const newDate = new Date(date)

                                    newDate.setHours(
                                        field.value?.getHours() ?? 0,
                                        field.value?.getMinutes() ?? 0
                                    )

                                    field.onChange(newDate)
                                    setInputVal(
                                        formatDateTime(newDate)
                                    )
                                    setIsInvalid(false)
                                    setOpen(false)
                                }
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <FormDescription className="text-xs text-muted-foreground">
                {field.value
                    ? formatDateTime(field.value)
                    : "Enter a date or choose one from the calendar."}
            </FormDescription>

            {isInvalid && (
                <p className="text-sm text-red-500">
                    Couldn't understand that. Try something like
                    "next Monday at 3pm".
                </p>
            )}

            <FormMessage />
        </FormItem>
    )
}
export default DatePicker
