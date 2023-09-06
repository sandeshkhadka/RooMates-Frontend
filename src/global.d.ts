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
  status: boolean;
};
type Contribution = {
  id: string;
  name: string;
  type: string;
  amount: number;
  belongsToId: string;
  createdAt: string;
  approvedBy: string[];
  passed: boolean;
};
