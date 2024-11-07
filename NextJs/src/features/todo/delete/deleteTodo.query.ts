import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type DeleteTodoQueryProps = {
  where: Prisma.TodoWhereUniqueInput;
};

export const DeleteTodoQuery = async ({ where }: DeleteTodoQueryProps) => {
  return await prisma.todo.delete({
    where,
  });
};
