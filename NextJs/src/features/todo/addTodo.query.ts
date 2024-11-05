import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const AddTodoQuery = async (input: Prisma.TodoCreateArgs) => {
  const todo = await prisma.todo.create(input);

  return todo;
};
