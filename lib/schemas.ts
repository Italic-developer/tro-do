import { z } from "zod";

export const formschema = z.object({
        name: z.string()
            .max(50, "Too long.")
            .min(5, "Put something down")
            .refine(val => val.trim().split(/\s+/).length <= 6, {
                message: "Must be 6 words or fewer"
            }),

        description: z.string()
            .max(250, "Too long.")
            .refine(val => val.trim().split(/\s+/).length <= 30, {
                message: "Must be 30 words or fewer"
            }),

        dueDate: z.date().refine(
            val => val instanceof Date && !isNaN(val.getTime()),
            {
                message: "Please Input A valid Date"
            }
        ),

        priority: z.enum(["Low", "Medium", "High"]),

        subTasks: z.array(z.string())
    })
