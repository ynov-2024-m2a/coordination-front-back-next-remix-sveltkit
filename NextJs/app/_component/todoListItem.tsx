import { todoDto } from "@/features/todo/todo.type.schema";
import {
  CheckCircle,
  CheckCircle2Icon,
  CircleDashed,
  Edit,
  Trash,
} from "lucide-react";
import { Divider } from "../../src/components/ui/divider";
import { Typography } from "../../src/components/ui/typography";
import { DeleteStepAlertDialog } from "./deleteTodoAlertDialog";
import { StatePopover } from "./statePopover";
import { TodoDialog } from "./todoDialog";

export type ListProps = {
  todo: todoDto;
};

export const TodoListItem = async ({ todo }: ListProps) => {
  return (
    <>
      <div className="flex justify-between items-center hover:bg-primary/10 h-14 rounded-lg first:mt-2 px-2">
        <div className="flex items-center gap-2">
          <StatePopover todoId={todo.id} state={todo.state}>
            {todo.state === "NOT_STARTED" && (
              <CircleDashed className="text-blue-400" />
            )}
            {todo.state === "ACTIVE" && (
              <CheckCircle2Icon className="text-orange-500" />
            )}
            {todo.state === "COMPLETED" && (
              <CheckCircle className="text-primary" />
            )}
          </StatePopover>
          <Typography variant="large">{todo.title}</Typography>
        </div>
        <div className="flex items-center gap-2">
          {todo.state !== "COMPLETED" && (
            <TodoDialog todo={todo}>
              <Edit className="text-blue-400 hover:text-primary" />
            </TodoDialog>
          )}
          <DeleteStepAlertDialog todo={todo}>
            <Trash className="text-red-400 hover:text-primary cursor-pointer" />
          </DeleteStepAlertDialog>
        </div>
      </div>
      <Divider className="last:hidden" />
    </>
  );
};
