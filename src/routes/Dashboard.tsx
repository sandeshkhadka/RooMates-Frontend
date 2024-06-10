import { useEffect } from "react";
import { useAppDispatch, useDashboard } from "../lib/hooks";
import {
  fetchContributionLeaderboard,
  fetchExpenseLeaderboard,
  fetchExpenseTimeline,
  fetchTaskLeaderboard,
} from "../features/dashboard-slice";
import ContributionLeaderboard from "../components/ContributionLeaderboard";
import TaskLeaderboard from "../components/TaskLeaderboard";
import ExpenseLeaderboard from "../components/ExpenseLeaderboard";
import ContributionSplits from "../components/StatsGrid";
import { Flex, Text } from "@mantine/core";
import { LineChart } from "@mantine/charts";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const dashboard = useDashboard();
  let data = dashboard.leaderboards.expenseTimeline.map((expense) => {
    return {
      date: expense.createdAt.split("T")[0],
      total: Number(expense.sum)
    }
  })
  data = data.map((item, index) => {
    if (index == 0) {
      return item
    } else {
      item.total += data[index - 1].total
      return item
    }
  })

  useEffect(() => {
    void dispatch(fetchTaskLeaderboard());
    void dispatch(fetchExpenseLeaderboard());
    void dispatch(fetchContributionLeaderboard());
    void dispatch(fetchExpenseTimeline())
  }, [dispatch]);
  return (
    <Flex direction="column" w="100%" px="xl" gap={"md"} justify={"space-around"} >
      <Flex
        h="fit"
        justify="space-between"
        w="100%"
        id="leaderboards"
      >
        <ContributionLeaderboard
          contributions={dashboard.leaderboards.contribution}
        />
        <TaskLeaderboard tasks={dashboard.leaderboards.task} />
        <ExpenseLeaderboard expenses={dashboard.leaderboards.expenses} />
      </Flex>

      {data.length ?
        <Flex gap="sm" justify="space-around">
          <ContributionSplits />
          <Flex direction="column" w={"80%"}>
            <Text ta="center">Expense Chart </Text>
            <LineChart h={300} m="sm" p="sm" dataKey="date" data={data}
              series={[
                {
                  name: "total",
                  color: "teal.6"
                }
              ]}
              xAxisProps={{
                widths: "10px"
              }}
              curveType="linear"
            />
          </Flex>
        </Flex>
        : null}
    </Flex>
  );
};

export default Dashboard;
