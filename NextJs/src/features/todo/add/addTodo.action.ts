"use server";

import { action } from "@/lib/backend/safe-actions";
import { AddTodoSchema } from "./addTodo.schema";
import { AddTodoQuery } from "./addTodo.query";

export const AddTodoAction = action
  .schema(AddTodoSchema)
  .action(async ({ parsedInput: { content, title } }) => {
    const todo = await AddTodoQuery({
      data: {
        content,
        title,
      },
    });

    return todo;
  });
