import { PieChart } from "@mantine/charts";
import { Table, Paper, Text, Flex } from "@mantine/core";

type ExpenseLeaderboardParamsType = {
  expenses: ExpenseLeaderboardType;
};
const ExpenseLeaderboard = (parms: ExpenseLeaderboardParamsType) => {
  const colors = [
    "indigo.6",
    "yellow.6",
    "teal.6",
    "gray.6",
    "blue.6",
    "red.6",
    "green.6",
    "orange.6",
    "pink.6",
    "purple.6",
    "cyan.6",
    "lime.6",
    "violet.6",
    "gold.6",
    "magenta.6"
  ];

  const data = parms.expenses.map((expense) => ({
    name: expense.category,
    value: expense.amount.amount || 0,
    color: colors[expense.rank]

  }))
  return (
    <Paper withBorder={true} radius="md" shadow="lg" px="xl" pb="sm">
      <Text ta="center" c="gray" fw="bold">Expenses</Text>
      <Flex gap="sm">
        <Table captionSide="top" highlightOnHover ta="center">
          <Table.Thead>
            <Table.Tr>
              <Table.Th><Text fw="600">Rank</Text></Table.Th>
              <Table.Th><Text fw="600">Category</Text></Table.Th>
              <Table.Th><Text fw="600">Amount</Text></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {parms.expenses.map((item) => {
              return (
                <Table.Tr c={colors[item.rank]} fw="600" key={item.category}>
                  <Table.Td><Text fw="400">{item.rank}</Text></Table.Td>
                  <Table.Td><Text fw="400">{item.category}</Text></Table.Td>
                  <Table.Td><Text fw="400">{item.amount.amount}</Text></Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
        <PieChart data={data} withLabelsLine labelsPosition="inside" withLabels labelsType="percent" mt="md" />
      </Flex>
    </Paper>
  );
};
export default ExpenseLeaderboard;
