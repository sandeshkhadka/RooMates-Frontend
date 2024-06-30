import { useAuth, useUsers } from "../lib/hooks";
import { Table, Paper, Text, Flex } from "@mantine/core";

type TaskLeaderboardParamsType = {
  tasks: TaskLeaderboardType;
};
const TaskLeaderboard = (parms: TaskLeaderboardParamsType) => {
  const userList = useUsers();
  const auth = useAuth()
  function resolveUsername(id: string) {
    const user = userList.find((item) => item.id == id);
    return user?.username;
  }
  const { completed, missed, pending } = parms.tasks
  return (
    <Flex>
      <Paper withBorder={true} radius="md" shadow="lg" px="sm">
        <Flex direction="row">
          <Flex direction="column">
            <Text ta="center" c="gray" fw="bold">Pending Task</Text>
            <Flex gap="sm">
              <Table captionSide="top" highlightOnHover ta="center">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th><Text fw="600">Username</Text></Table.Th>
                    <Table.Th><Text fw="600">Amount</Text></Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {pending.map((item) => {
                    return (
                      <Table.Tr key={item.userId}>
                        <Table.Td><Text fw="400">{resolveUsername(item.userId)}</Text></Table.Td>
                        <Table.Td><Text fw="400">{item.amount}</Text></Table.Td>
                      </Table.Tr>
                    );
                  })}
                </Table.Tbody>

              </Table>

            </Flex>
          </Flex>
          <Flex direction="column">
            <Text ta="center" c="gray" fw="bold">My Task Score</Text>
            <Table captionSide="top" highlightOnHover ta="center">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th><Text fw="600">Status</Text></Table.Th>
                  <Table.Th><Text fw="600">Amount</Text></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td><Text fw="400">Pending</Text></Table.Td>
                  <Table.Td><Text fw="400">{pending.find((user) => (user.userId == auth.user?.id))?.amount || 0}</Text></Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td><Text fw="400">Completed</Text></Table.Td>
                  <Table.Td><Text fw="400">{completed.find((user) => (user.userId == auth.user?.id))?.amount || 0}</Text></Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td><Text fw="400">Missed</Text></Table.Td>
                  <Table.Td><Text fw="400">{missed.find((user) => (user.userId == auth.user?.id))?.amount || 0}</Text></Table.Td>
                </Table.Tr>
              </Table.Tbody>

            </Table>

          </Flex>
        </Flex>
      </Paper >
    </Flex >
  );
};
export default TaskLeaderboard;
