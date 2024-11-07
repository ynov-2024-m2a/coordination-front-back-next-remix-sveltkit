import { GetTodosQuery } from "@/features/todo/get/getTodos.query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import { Typography } from "../../src/components/ui/typography";
import { TodoListItem } from "./todoListItem";

type TodoContainerProps = {};

export const TodoContainer = async ({}: TodoContainerProps) => {
  const {
    success,
    data: todos,
    error,
  } = await GetTodosQuery({
    query: {
      orderBy: { createdAt: "asc" },
    },
  });

  if (!success) throw new Error("Failed to fetch todos: " + error?.message);

  return (
    <Card>
      <CardHeader className="bg-muted">
        <CardTitle className="flex justify-between select-none">
          <Typography>ToDo{!!todos.length && "s"}</Typography>
          <Typography>Actions</Typography>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {todos.map((todo) => (
          <TodoListItem todo={todo} key={todo.id} />
        ))}
      </CardContent>
    </Card>
  );
};
