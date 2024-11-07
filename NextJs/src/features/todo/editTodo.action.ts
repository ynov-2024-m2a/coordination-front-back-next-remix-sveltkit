"use server";

import { action } from "@/lib/backend/safe-actions";
import { EditTodoQuery } from "./editTodo.query";
import { EditTodoSchema } from "./editTodo.schema";

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
