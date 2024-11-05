import { z } from "zod";

export const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  limitDate: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),

  listId: z.string(),
});

export const todosSchema = z.array(todoSchema);

export type todoDto = z.infer<typeof todoSchema>;
export type todosDto = z.infer<typeof todosSchema>;
