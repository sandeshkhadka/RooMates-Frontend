import { deleteTask, updateTask } from "../features/tasks-slice";
import { useAppDispatch, useAuth, useUsername } from "../lib/hooks";
import { Flex, Paper, Text } from "@mantine/core";
import { IconUser, IconNotes, IconCheck, IconTrash } from "@tabler/icons-react";
type TaskProps = {
  task: Task;
};
const Task = (props: TaskProps) => {
  const { task } = props;
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const username = useUsername(task.belongsToId);
  const belogsTo = task.belongsToId === auth.user?.id;
  function markCompleteHandler() {
    void dispatch(
      updateTask({
        id: task.id,
        name: task.name,
        status: "Completed",
      }),
    );
  }
  function handleDelete() {
    void dispatch(deleteTask(task.id));
  }
  return (
    <Paper withBorder={true} radius="md" shadow="xs" p="sm" m="xs">
      <Flex direction="column" px="md" gap="1px">
        <Flex direction="row" justify="space-between">
          <Flex>
            <IconUser color="gray" />
            <Text size="md" c="gray">
              {username}
            </Text>
          </Flex>
          <Text>{task.schedule}</Text>
          <Text >{task.status}</Text>
        </Flex>
        <Flex justify="space-between">
          <Flex gap="2px">
            <IconNotes />
            <Text>{task.name}</Text>
          </Flex>
          <Flex gap="md">
            {belogsTo && task.status !== "Completed" ? <IconCheck color="green" onClick={markCompleteHandler} cursor="pointer" /> : null}
            {belogsTo ? <IconTrash cursor="pointer" onClick={handleDelete} /> : null}
          </Flex>

        </Flex>
      </Flex>
    </Paper>
  );
};

export default Task;
