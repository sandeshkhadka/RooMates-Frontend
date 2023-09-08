import { useEffect, useState } from "react";
import { dummyUserResponse } from "../assets/data";

type TaskProps = {
  task: Task;
};
const Task = (props: TaskProps) => {
  const { task } = props;
  const [username, setUsername] = useState("");

  useEffect(() => {
    const userId = task.belongsToId;
    const user = dummyUserResponse.users.find((user) => user.id === userId);
    const username = user!.username;
    setUsername(username);
  }, [task.belongsToId]);
  return (
    <div className="flex flex-col px-4 py-2 gap-2  border bg-sky-200">
      <div className="flex flex-row justify-between">
        <div className="text-xl font-bold">{username}</div>
        <div>{task.schedule}</div>
        <div className="text-xl font-bold"> {task.status}</div>
      </div>
      <div>todo: {task.name}</div>
      <div className="cursor-pointer">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow">
          Mark as Complete
        </button>
      </div>
    </div>
  );
};

export default Task;
