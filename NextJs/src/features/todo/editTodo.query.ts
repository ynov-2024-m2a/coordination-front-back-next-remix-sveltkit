import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const EditTodoQuery = async (query: Prisma.TodoUpdateArgs) => {
  const todo = await prisma.todo.update({
    ...query,
  });

  return todo;
};
