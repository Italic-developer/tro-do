import { ArrowUpNarrowWideIcon, Calendar, CircleCheck, CircleDashed, PencilIcon, SquareArrowOutUpRight, Trash2 } from 'lucide-react';
import React from 'react'
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Todo } from '@/lib/types';
import { isCrit } from '@/lib/utils';
import TodoView from './TodoView';

function TodoCard({ todo, setTodos }: { todo: Todo, setTodos: React.Dispatch<React.SetStateAction<Todo[]>> }) {
    const isCompleted = todo.status === "Completed"

    return (
        <Card >
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

                    <Button onClick={() => {

                        setTodos(prev =>
                            prev.map(t => {
                                if (t.id !== todo.id) return t

                                const newStatus = isCompleted
                                    ? isCrit(t)
                                        ? "Critical"
                                        : "Pending"
                                    : "Completed"

                                return {
                                    ...t,
                                    status: newStatus
                                }
                            })
                        )
                    }} variant="secondary" size="icon" className="hover:bg-secondary/40" title={isCompleted ? "Mark as pending" : "Mark as completed"}>
                        {isCompleted ? <CircleDashed className="text-gray-500" /> : <CircleCheck className="text-green-500" />}
                    </Button>


                    <TodoView todo={todo} />

                    <Button onClick={() => {
                        setTodos(prev => prev.filter(t => t.id !== todo.id));
                    }} variant="secondary" size="icon" className="hover:bg-secondary/40" title="Delete">
                        <Trash2 className="text-red-500" />
                    </Button>
                </div>
            </CardFooter>
        </Card >
    )
}

export default TodoCard
