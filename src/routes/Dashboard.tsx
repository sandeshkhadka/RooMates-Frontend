import { useEffect } from "react";
import { useAppDispatch, useDashboard } from "../lib/hooks";
import {
  fetchContributionLeaderboard,
  fetchExpenseLeaderboard,
  fetchTaskLeaderboard,
} from "../features/dashboard-slice";
import ContributionLeaderboard from "../components/ContributionLeaderboard";
import TaskLeaderboard from "../components/TaskLeaderboard";
import ExpenseLeaderboard from "../components/ExpenseLeaderboard";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const dashboard = useDashboard();
  console.log(dashboard);
  useEffect(() => {
    void dispatch(fetchTaskLeaderboard());
    void dispatch(fetchExpenseLeaderboard());
    void dispatch(fetchContributionLeaderboard());
  }, [dispatch]);
  return (
    <>
      <ContributionLeaderboard
        contributions={dashboard.leaderboards.contribution}
      />
      <TaskLeaderboard tasks={dashboard.leaderboards.task} />
      <ExpenseLeaderboard expenses={dashboard.leaderboards.expenses} />
    </>
  );
};

export default Dashboard;
