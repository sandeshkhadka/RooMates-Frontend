import { useEffect } from "react";
import { useAppDispatch } from "../lib/hooks";
import { fetchPendingTasks } from "../features/dashboard-slice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(fetchPendingTasks);
  }, [dispatch]);
  return (
    <>
      <div>This is Dashboard</div>
    </>
  );
};

export default Dashboard;
