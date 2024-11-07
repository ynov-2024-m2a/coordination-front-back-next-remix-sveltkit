import { z } from "zod";

export const EditTodoSchema = z.object({
  id: z.string(),
  content: z.string(),
  title: z.string(),
});

export type EditTodo = z.infer<typeof EditTodoSchema>;
