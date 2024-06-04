type User = {
  id: string;
  username: string;
  tasks: Task[];
};
type Task = {
  id: string;
  name: string;
  schedule: string;
  belongsToId: string;
  status: string;
};
type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>;
type ContributionType = {
  id: string;
  name: string;
  type: string;
  amount: number;
  belongsToId: string;
  createdAt: string;
  approvedBy: string[];
  passed: boolean;
};
type ContributionLeaderboardType = {
  rank: number;
  userId: string;
  amount: number;
}[];
type ExpenseLeaderboardType = {
  rank: number;
  category: string;
  amount: {
    amount: number | null;
  };
}[];
type TaskLeaderboardType = {
  pending: {
    userId: string;
    amount: number;
  }[];
  completed: {
    userId: string;
    amount: number;
  }[];
  missed: {
    userId: string;
    amount: number;
  }[];
};
