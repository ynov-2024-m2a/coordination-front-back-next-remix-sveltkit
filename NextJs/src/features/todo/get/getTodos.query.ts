import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { todosSchema } from "../todo.type.schema";

type getTodosProps = {
  query: Prisma.TodoFindManyArgs;
};

export const GetTodosQuery = async (props: getTodosProps) => {
  const todos = await prisma.todo.findMany(props.query);

  return todosSchema.safeParse(todos);
};
