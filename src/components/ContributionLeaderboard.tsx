import { useUsers } from "../lib/hooks";

type ContributionLeaderboardParamsType = {
  contributions: ContributionLeaderboardType;
};
const ContributionLeaderboard = (parms: ContributionLeaderboardParamsType) => {
  const userList = useUsers();
  function resolveUsername(id: string) {
    const user = userList.find((item) => item.id == id);
    return user?.username;
  }
  return (
    <div>
      <h1 className="text-xl font-bold"> ContributionLeaderboard</h1>
      <ul>
        {parms.contributions.map((item) => {
          return (
            <div>
              <li>Rank: {item.rank}</li>
              <li>Username: {resolveUsername(item.userId)}</li>
              <li>Amount: {item.amount}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
export default ContributionLeaderboard;
