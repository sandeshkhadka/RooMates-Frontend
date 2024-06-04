import { useUsers } from "../lib/hooks";

type TaskLeaderboardParamsType = {
  tasks: TaskLeaderboardType;
};
const TaskLeaderboard = (parms: TaskLeaderboardParamsType) => {
  const userList = useUsers();
  function resolveUsername(id: string) {
    const user = userList.find((item) => item.id == id);
    return user?.username;
  }
  return (
    <div>
      <h1 className="text-xl font-bold">Task Leaderboard </h1>
      <ul>
        {parms.tasks.pending.map((item, index) => {
          return (
            <div>
              <li>Rank: {index + 1}</li>
              <li>Username: {resolveUsername(item.userId)}</li>
              <li>No: {item.amount}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
export default TaskLeaderboard;
