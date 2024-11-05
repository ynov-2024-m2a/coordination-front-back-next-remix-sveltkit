import { z } from "zod";

export const AddTodoSchema = z.object({
  listId: z.string(),
  title: z.string().min(3),
  content: z.string(),
  limitDate: z.date().nullable(),
});

export type AddTodo = z.infer<typeof AddTodoSchema>;
