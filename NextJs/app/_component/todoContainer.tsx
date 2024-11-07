import { todosDto } from "@/features/todo/todo.type.schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import { Typography } from "../../src/components/ui/typography";
import { TodoListItem } from "./todoListItem";

type TodoContainerProps = {
  todos: todosDto;
};

export const TodoContainer = ({ todos }: TodoContainerProps) => {
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
