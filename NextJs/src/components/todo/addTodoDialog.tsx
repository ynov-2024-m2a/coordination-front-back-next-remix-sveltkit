"use client";

import { LoadingButton } from "@/features/form/SubmitButton";
import { AddTodoAction } from "@/features/todo/addTodo.action";
import { AddTodo, AddTodoSchema } from "@/features/todo/addTodo.schema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export type AddTodoDialogProps = PropsWithChildren;

export const AddTodoDialog = ({ children }: AddTodoDialogProps) => {
  const route = useRouter();

  const [open, setOpen] = useState(false);
  const form = useZodForm({
    schema: AddTodoSchema,
    defaultValues: {},
  });

  const { mutateAsync: addTodoAsync } = useMutation({
    mutationFn: async (values: AddTodo) => {
      const result = await AddTodoAction(values);
      if (!result?.data) {
        toast.error(result?.serverError);
        return;
      }

      toast.success("Your todo as been added to list.");
      form.reset();
      setOpen(false);

      return result.data;
    },
    onSuccess() {
      route.refresh();
    },
  });

  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new todo</DialogTitle>
          <DialogDescription>
            Fill the form bellow to create a new todo.
          </DialogDescription>
        </DialogHeader>
        <Form
          form={form}
          onSubmit={async (v) => {
            addTodoAsync(v);
          }}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Todo name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="Make a ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton type="submit">Add new todo</LoadingButton>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
