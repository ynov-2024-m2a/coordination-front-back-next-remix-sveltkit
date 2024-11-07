"use server";

import { EditTodoQuery } from "@/features/todo/update/editTodo.query";
import { EditTodoSchema } from "@/features/todo/update/editTodo.schema";
import { action } from "@/lib/backend/safe-actions";

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
