"use client";

import { alertDialog } from "@/features/alert-dialog/alert-dialog-store";
import { DeleteTodoAction } from "@/features/todo/delete/deleteTodo.action";
import { todoDto } from "@/features/todo/todo.type.schema";
import { isActionSuccessful } from "@/lib/backend/action-utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { toast } from "sonner";
import { Typography } from "../../src/components/ui/typography";

export type DeleteStepAlertDialogProps = PropsWithChildren<{
  todo: todoDto;
  onDeleted?: () => void;
}>;

export const DeleteStepAlertDialog = ({
  todo,
  children,
}: DeleteStepAlertDialogProps) => {
  const router = useRouter();
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const res = await DeleteTodoAction({ id: todo.id });

      if (!isActionSuccessful(res)) {
        toast.error(`Failed to delete todo: ${todo.title}`);
        return;
      }

      toast.success(`Todo "${todo.title}" deleted successfully`);
    },
    onSuccess: () => router.refresh(),
  });

  return (
    <div
      onClick={() =>
        alertDialog.add({
          title: `Delete todo : "${todo.title}"`,
          description: (
            <Typography variant="lead" className="text-base">
              Are you sure you want to delete this task ?
            </Typography>
          ),
          confirmText: todo.title,
          loading: isPending,
          action: {
            label: "Delete",
            onClick: mutate,
          },
        })
      }
    >
      {children}
    </div>
  );
};
