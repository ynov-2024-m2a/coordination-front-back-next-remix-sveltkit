"use server";

import { action } from "@/lib/backend/safe-actions";
import { z } from "zod";
import { DeleteTodoQuery } from "./deleteTodo.query";

export const DeleteTodoAction = action
  .schema(
    z.object({
      id: z.string(),
    }),
  )
  .action(
    async ({ parsedInput: { id } }) => await DeleteTodoQuery({ where: { id } }),
  );
