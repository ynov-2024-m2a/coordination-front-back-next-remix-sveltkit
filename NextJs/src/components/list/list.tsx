import { ListDto } from "@/features/list/listDto.schema";
import { getTodoByListIdQuery } from "@/features/todo/getTodoByListId.query";
import { PlusCircle } from "lucide-react";
import { AddTodoDialog } from "../todo/addTodoDialog";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Typography } from "../ui/typography";
import { DeleteList } from "./deleteList";

export type ListProps = {
  list: ListDto;
};

export const List = async ({ list }: ListProps) => {
  const todos = await getTodoByListIdQuery({
    where: {
      listId: list.id,
    },
  });

  return (
    <Card className="h-fit mt-4 bg-card first:ml-4 last:mr-4 w-96 group">
      <CardHeader>
        <div className="flex item-center justify-between">
          <CardTitle>{list.title}</CardTitle>
          <DeleteList listId={list.id} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full flex justify-center">
          <AddTodoDialog listId={list.id}>
            <Button variant="outline" className="w-full">
              <div className="flex item-center gap-2">
                <PlusCircle className="text-primary" />
                <Typography>Add todo</Typography>
              </div>
            </Button>
          </AddTodoDialog>
        </div>
        {!!todos.length && (
          <div className="w-full flex gap-2">
            <li>
              {todos.map((todo, idx) => (
                <ul key={idx}>{todo.title}</ul>
              ))}
            </li>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
