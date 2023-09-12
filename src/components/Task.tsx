// import { useEffect, useState } from "react";
// import { dummyUserResponse } from "../assets/data";
import { deleteTask, updateTask } from "../features/tasks-slice";
import { useAppDispatch, useAuth, useUsername } from "../lib/hooks";
import DeleteIcon from "./Delete";

type TaskProps = {
  task: Task;
};
const Task = (props: TaskProps) => {
  const { task } = props;
  // const [username, setUsername] = useState("");
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const username = useUsername(task.belongsToId);
  const belogsTo = task.belongsToId === auth.user?.id;
  function markCompleteHandler() {
    void dispatch(
      updateTask({
        id: task.id,
        name: task.name,
        status: "Completed",
      }),
    );
  }
  function handleDelete() {
    void dispatch(deleteTask(task.id));
  }
  // useEffect(() => {
  //   const userId = task.belongsToId;
  //   const user = dummyUserResponse.users.find((user) => user.id === userId);
  //   const username = user!.username;
  //   setUsername(username);
  // }, [task.belongsToId]);
  return (
    <div className="flex flex-col px-4 py-2 gap-2  border bg-sky-200">
      <div className="flex flex-row justify-between">
        <div className="text-xl font-bold">{username}</div>
        <div>{task.schedule}</div>
        <div className="text-xl font-bold"> {task.status}</div>
      </div>
      <div>todo: {task.name}</div>
      <div className="flex flex-row justify-between">
        {belogsTo && task.status !== "Completed" ? (
          <div className="cursor-pointer">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
              onClick={markCompleteHandler}
            >
              Mark as Complete
            </button>
          </div>
        ) : null}
        <div className="cursor-pointer" onClick={handleDelete}>
          {belogsTo ? <DeleteIcon /> : null}
        </div>
      </div>
    </div>
  );
};

export default Task;
