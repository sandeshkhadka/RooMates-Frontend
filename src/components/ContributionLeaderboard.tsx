import { DonutChart, PieChart } from "@mantine/charts";
import { useUsers } from "../lib/hooks";
import { Flex, Paper, Table, Text } from "@mantine/core";
type ContributionLeaderboardParamsType = {
  contributions: ContributionLeaderboardType;
};
const ContributionLeaderboard = (parms: ContributionLeaderboardParamsType) => {
  const userList = useUsers();
  function resolveUsername(id: string) {
    const user = userList.find((item) => item.id == id);
    return user?.username;
  }
  const colors = ["indigo.6", "yellow.6", "teal.6", "gray.6"]
  const expenseData = parms.contributions.map((contribution) => {
    return {
      name: resolveUsername(contribution.userId) || "",
      value: contribution.amount || 0,
      color: colors[contribution.rank]
    }
  })
  return (
    <Paper withBorder={true} radius="md" shadow="lg" px="xl" pb="sm">
      <Text ta="center" c="gray" fw="bold">Contribution Leaderboard</Text>
      <Flex gap="md" >
        <Table captionSide="top" highlightOnHover ta="center">
          <Table.Thead>
            <Table.Tr>
              <Table.Th><Text fw="600">Rank</Text></Table.Th>
              <Table.Th><Text fw="600">Username</Text></Table.Th>
              <Table.Th><Text fw="600">Amount</Text></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {parms.contributions.map((item) => {
              return (
                <Table.Tr c={colors[item.rank]} fw="600" key={item.userId}>
                  <Table.Td><Text fw="400" >{item.rank}</Text></Table.Td>
                  <Table.Td><Text fw="400">{resolveUsername(item.userId)}</Text></Table.Td>
                  <Table.Td><Text fw="400">{item.amount}</Text></Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
        <PieChart data={expenseData} withLabelsLine labelsPosition="inside" withLabels labelsType="percent" mt="md" />
      </Flex>
    </Paper >
  );
};
export default ContributionLeaderboard;
