import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { todosSchema } from "./todo.type.schema";

type getTodoByListIdQueryProps = {
  where: Prisma.TodoWhereInput;
};

export const getTodoByListIdQuery = async ({
  where,
}: getTodoByListIdQueryProps) => {
  const todos = await prisma.todo.findMany({
    where,
  });

  return todosSchema.parse(todos);
};
