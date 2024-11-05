"use client";

import { LoadingButton } from "@/features/form/SubmitButton";
import { AddListAction } from "@/features/list/addList.action";
import { AddList, AddListSchema } from "@/features/list/addListSchema";
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

export type AddListDialogProps = PropsWithChildren;

export const AddListDialog = ({ children }: AddListDialogProps) => {
  const route = useRouter();

  const [open, setOpen] = useState(false);
  const form = useZodForm({
    schema: AddListSchema,
    defaultValues: {},
  });

  const { mutateAsync: addListAsync } = useMutation({
    mutationFn: async (values: AddList) => {
      const result = await AddListAction(values);
      if (!result?.data) {
        toast.error(result?.serverError);
        return;
      }

      toast.success("Your list as been created.");
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
          <DialogTitle>Add new list</DialogTitle>
          <DialogDescription>
            Fill the form bellow to create a new list.
          </DialogDescription>
        </DialogHeader>
        <Form
          form={form}
          onSubmit={async (v) => {
            console.log("🚀 ~ onSubmit={ ~ v:", v);
            addListAsync(v);
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
                  <Input placeholder="List title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton type="submit">Create new list</LoadingButton>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
