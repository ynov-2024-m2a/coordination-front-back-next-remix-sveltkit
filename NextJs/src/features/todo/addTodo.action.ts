"use server";

import { action } from "@/lib/backend/safe-actions";
import { AddTodoQuery } from "./addTodo.query";
import { AddTodoSchema } from "./addTodo.schema";

export const AddTodoAction = action
  .schema(AddTodoSchema)
  .action(async ({ parsedInput: { content, limitDate, listId, title } }) => {
    const todo = await AddTodoQuery({
      data: {
        content,
        title,
        limitDate,
        listId,
      },
    });

    return todo;
  });
