"use client";

import { EditTodoAction } from "@/features/todo/editTodo.action";
import { EditTodo, EditTodoSchema } from "@/features/todo/editTodo.schema";
import { todoDto } from "@/features/todo/todo.type.schema";
import { useDisclosure } from "@/hooks/useDisclosure";
import { isActionSuccessful } from "@/lib/backend/action-utils";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import useKey from "react-use/lib/useKey";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useZodForm,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { UnsavedBar } from "../ui/unsavedBar";

type TodoDialogProps = PropsWithChildren<{
  todo: todoDto;
}>;

export const TodoDialog = ({ children, todo }: TodoDialogProps) => {
  const form = useZodForm({
    schema: EditTodoSchema,
    defaultValues: {
      content: todo.content,
      limitDate: todo.limitDate,
      title: todo.title,
    },
  });
  console.log("🚀 ~ TodoDialog ~ form:", form);

  const [isOpen, formHandler] = useDisclosure(false, {
    onClose() {
      form.reset();
    },
  });

  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: async (v: EditTodo) => {
      const res = await EditTodoAction({
        ...v,
        id: todo.id,
      });
      console.log("🚀 ~ mutationFn: ~ res:", res);

      if (!isActionSuccessful(res)) {
        toast.error("Failed to update todo");
        return;
      }

      toast.success("Todo updated");
    },
    onSuccess: () => {
      formHandler.close();
      router.refresh();
    },
  });

  const isDirty = form.formState.isDirty;
  const handleRestForm = () => form.reset();
  const handleSubmit = () => mutateAsync(form.getValues());

  useKey(
    (event) => (event.ctrlKey || event.metaKey) && event.key === "s" && isDirty,
    handleSubmit,
    { event: "keydown" },
    [isDirty],
  );
  useKey(
    (event) => (event.ctrlKey || event.metaKey) && event.key === "q" && isDirty,
    handleRestForm,
    { event: "keydown" },
    [isDirty],
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(state) => !state && formHandler.close()}
    >
      <DialogTrigger onClick={formHandler.open}>{children}</DialogTrigger>
      <Form form={form} onSubmit={() => {}}>
        <DialogContent className={cn("px-4", isDirty ? "pb-24" : null)}>
          <DialogHeader>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DialogTitle
                      contentEditable
                      className="hover:border border-input p-2 rounded-md "
                      onBlur={(e) =>
                        field.onChange(e.currentTarget.textContent)
                      }
                    >
                      {field.value}
                    </DialogTitle>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </DialogHeader>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <UnsavedBar
            isShow={isDirty}
            onSubmit={handleSubmit}
            onCancel={handleRestForm}
            isLoading={form.formState.isSubmitting}
          />
        </DialogContent>
      </Form>
    </Dialog>
  );
};
