import { action } from "@/lib/backend/safe-actions";
import { z } from "zod";
import { EditTodoQuery } from "./editTodo.query";

export const EditTodoSchema = z.object({
  id: z.string(),
  content: z.string(),
  limitDate: z.date().nullable(),
  title: z.string(),
});

export type EditTodo = z.infer<typeof EditTodoSchema>;

export const EditTodoAction = action
  .schema(EditTodoSchema)
  .action(async ({ parsedInput: { content, id, title, limitDate } }) => {
    console.log("🚀 ~ .action ~ parsedInput:", {
      content,
      id,
      title,
      limitDate,
    });
    const res = await EditTodoQuery({
      where: {
        id,
      },
      data: {
        content,
        title,
        limitDate,
      },
    });
    console.log("🚀 ~ .action ~ res:", res);

    return res;
  });
