import { updateStateQuery } from "@/features/todo/updateState.query";
import { State } from "@prisma/client";
import { CheckCircle, CheckCircle2Icon, CircleDashed } from "lucide-react";
import { revalidatePath } from "next/cache";
import { PropsWithChildren } from "react";
import { Button } from "../../src/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../src/components/ui/popover";

type StatePopoverProps = PropsWithChildren<{
  todoId: string;
  state: State;
}>;

export const StatePopover = ({
  todoId,
  state,
  children,
}: StatePopoverProps) => {
  const UpdateState = async (formData: FormData) => {
    "use server";
    await updateStateQuery({
      where: {
        id: formData.get("todoId") as string,
      },
      data: {
        state: formData.get("state") as State,
      },
    });
    revalidatePath("/");
  };

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="flex flex-col w-fit gap-2">
        <form action={UpdateState}>
          <input type="hidden" name="todoId" value={todoId} />

          <Button
            type="submit"
            variant="ghost"
            className="flex gap-2 w-full"
            disabled={state === "NOT_STARTED"}
            name="state"
            value="NOT_STARTED"
          >
            <CircleDashed className="text-blue-400" />
            Not Started
          </Button>

          <Button
            type="submit"
            variant="ghost"
            className="flex gap-2 w-full"
            disabled={state === "ACTIVE"}
            name="state"
            value="ACTIVE"
          >
            <CheckCircle2Icon className="text-orange-500" />
            Active
          </Button>

          <Button
            type="submit"
            variant="ghost"
            className="flex gap-2 w-full"
            disabled={state === "COMPLETED"}
            name="state"
            value="COMPLETED"
          >
            <CheckCircle className="text-primary" />
            Completed
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
