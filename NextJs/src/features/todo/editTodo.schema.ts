import { z } from "zod";

export const EditTodoSchema = z.object({
  id: z.string(),
  content: z.string(),
  limitDate: z.date().nullable(),
  title: z.string(),
});

export type EditTodo = z.infer<typeof EditTodoSchema>;
