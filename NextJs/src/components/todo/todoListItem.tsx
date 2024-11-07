import { todoDto } from "@/features/todo/todo.type.schema";
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Typography } from "../ui/typography";

export type ListProps = {
  todo: todoDto;
  className?: string;
};

export const TodoListItem = async ({ todo, className }: ListProps) => {
  return (
    <Card
      className={cn(
        "border border-primary w-full p-2 hover:underline text-center cursor-pointer select-none",
        className,
      )}
    >
      <Typography className="">{todo.title}</Typography>
    </Card>
  );
};
