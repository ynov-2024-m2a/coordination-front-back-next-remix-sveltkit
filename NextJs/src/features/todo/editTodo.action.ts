"use server";

import { action } from "@/lib/backend/safe-actions";
import { EditTodoQuery } from "./editTodo.query";
import { EditTodoSchema } from "./editTodo.schema";

export const EditTodoAction = action
  .schema(EditTodoSchema)
  .action(async ({ parsedInput: { content, id, title } }) => {
    const res = await EditTodoQuery({
      where: {
        id,
      },
      data: {
        content,
        title,
      },
    });

    return res;
  });
