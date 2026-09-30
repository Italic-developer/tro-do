export interface Todo {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    priority: "Low" | "Medium" | "High";
    status: "Completed" | "Pending" | "Critical";

}
export const mockTodos: Todo[] = [
   {
    id: "1",
    title: "Project meeting with John",
    description: "Discuss the project goals, objectives, timelines, and budget with John.",
    dueDate: new Date("2023-03-15"),
    priority: "High",
    status: "Pending",
},
{
    id: "2",
    title: "Buy groceries",
    description: "Pick up essentials like milk, eggs, and bread.",
    dueDate: new Date("2023-03-16"),
    priority: "Low",
    status: "Completed",
},
{
    id: "3",
    title: "Fix app bug",
    description: "Identify and fix the bug causing crashes.",
    dueDate: new Date("2023-03-17"),
    priority: "Medium",
    status: "Critical",
},
{
    id: "4",
    title: "Buy household items",
    description: "Toilet paper, trash bags, paper towels, etc.",
    dueDate: new Date(2023, 10, 5),
    priority: "High",
    status: "Pending",
},
{
    id: "5",
    title: "Annual check-up",
    description: "Doctor visit and vaccines if needed.",
    dueDate: new Date(2023, 10, 10),
    priority: "Medium",
    status: "Completed",
},
{
    id: "6",
    title: "Submit project report",
    description: "Final review and submission.",
    dueDate: new Date(2023, 10, 12),
    priority: "Low",
    status: "Pending",
},
];
