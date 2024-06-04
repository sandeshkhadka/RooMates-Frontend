type ExpenseLeaderboardParamsType = {
  expenses: ExpenseLeaderboardType;
};
const ExpenseLeaderboard = (parms: ExpenseLeaderboardParamsType) => {
  return (
    <div>
      <h1 className="text-xl font-bold"> ExpenseLeaderboard</h1>
      <ul>
        {parms.expenses.map((item) => {
          return (
            <div>
              <li>Rank: {item.rank}</li>
              <li>Category: {item.category}</li>
              <li>Amount: {item.amount.amount}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
export default ExpenseLeaderboard;
