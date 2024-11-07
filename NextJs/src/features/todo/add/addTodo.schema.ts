import { State } from "@prisma/client";
import { z } from "zod";

export const AddTodoSchema = z.object({
  title: z.string().min(3),
  content: z.string(),
  state: z.nativeEnum(State).default(State.NOT_STARTED),
});

export type AddTodo = z.infer<typeof AddTodoSchema>;
