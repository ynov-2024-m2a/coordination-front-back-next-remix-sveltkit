import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { todoSchema } from "./todo.type.schema";

type UpdateStateQueryProps = {
  where: Prisma.TodoWhereUniqueInput;
  data: Prisma.TodoUpdateInput;
};

export const updateStateQuery = async ({
  data,
  where,
}: UpdateStateQueryProps) => {
  const todo = await prisma.todo.update({
    where,
    data,
  });

  return todoSchema.safeParse(todo);
};
