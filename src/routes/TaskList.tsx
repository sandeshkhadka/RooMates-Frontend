import { useEffect } from "react";
import Task from "../components/Task";
import { useAppDispatch, useTasks, useUsers } from "../lib/hooks";
import { fetchTask, postTask } from "../features/tasks-slice";
import { Button, Flex, NativeSelect, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const TaskList = () => {
  const tasklist = useTasks();
  const dispatch = useAppDispatch();
  const users = useUsers();
  const usernames = ["Select a user", ...users.map((user) => user.username)]
  useEffect(() => {
    void dispatch(fetchTask());
  }, [dispatch]);
  const form = useForm({
    initialValues: {
      name: "",
      assignTo: "Select a user:",
    }
  })
  return (
    <Flex w="100%" h="100vh" gap="xs">
      <Flex gap="xs" py="xs" direction="column" w="50%">
        {tasklist.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </Flex>
      <form
        style={{
          width: "50%"
        }}
        onSubmit={form.onSubmit((values) => {
          const user = users.find((user) => user.username == values.assignTo)
          const id = user?.id
          const name = values.name
          console.log(values)
          console.log(id)
          if (!name) {
            alert("Task cannot be empty");
            return;
          }
          if (!id) {
            alert("Select a user");
            return;
          }
          void dispatch(
            postTask({
              name,
              assignToId: id,
            }),
          );
        })}
      >
        <Flex direction="column" gap="xs" w="100%" h="fit" m="xs" pr="xl">
          <TextInput label="Name" styles={
            {
              input: {
                border: "2px solid lightgray",
                borderRadius: "0",
                outline: "none",
                padding: "4px"
              }
            }
          }
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <NativeSelect label="Assign To:" key={form.key("assignTo")} data={usernames} value={users.map((user) => user.id)} styles={
            {
              input: {
                border: "2px solid lightgray",
                borderRadius: "0",
                outline: "none",
                padding: "4px"
              }
            }
          }
            {...form.getInputProps("assignTo")} />
          <Button
            type="submit"
            styles={
              {
                root: {
                  backgroundColor: "#228BE6",
                  color: "white"
                }
              }
            }
          >
            Submit
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default TaskList;
