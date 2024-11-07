import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { PlusIcon } from "lucide-react";
import { AddTodoDialog } from "./_component/addTodoDialog";
import { TodoContainer } from "./_component/todoContainer";

const HomePage = async () => {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle className="select-none text-center w-full">
          ToDo List
        </LayoutTitle>
        <LayoutActions className="flex justify-center w-full">
          <AddTodoDialog>
            <Button
              className="flex justify-center items-center gap-2 w-full"
              variant="outline"
            >
              <Typography className="uppercase">Add New ToDo</Typography>
              <PlusIcon />
            </Button>
          </AddTodoDialog>
        </LayoutActions>
      </LayoutHeader>
      <LayoutContent>
        <TodoContainer />
      </LayoutContent>
    </Layout>
  );
};

export default HomePage;
