export interface Todo {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    priority: "Low" | "Medium" | "High";
    status: "Completed" | "Pending" | "Critical";
    subTasks?: string[];

}
