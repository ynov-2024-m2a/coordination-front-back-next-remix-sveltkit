import { State } from "@prisma/client";
import { z } from "zod";

export const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),

  state: z.nativeEnum(State),
});

export const todosSchema = z.array(todoSchema);

export type todoDto = z.infer<typeof todoSchema>;
export type todosDto = z.infer<typeof todosSchema>;
