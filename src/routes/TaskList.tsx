import { useEffect } from "react";
import Task from "../components/Task";
import { useAppDispatch, useTasks, useUsers } from "../lib/hooks";
import { fetchTask, postTask } from "../features/tasks-slice";

const TaskList = () => {
  const tasklist = useTasks();
  const dispatch = useAppDispatch();
  const users = useUsers();
  useEffect(() => {
    void dispatch(fetchTask());
  }, [dispatch]);

  return (
    <div className="w-full h-screen flex flex-row gap-2">
      <div className="w-1/2 overflow-scroll no-scrollbar flex flex-col gap-2 py-2">
        {tasklist.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </div>
      <form
        className="flex flex-col gap-2 border w-1/2 h-fit m-2 p-2"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const id = formData.get("user")?.toString();
          const name = formData.get("name")?.toString();
          if (!name) {
            alert("Task cannot be empty");
            return;
          }
          if (!id) {
            alert("Select a user");
            return;
          }
          void dispatch(
            postTask({
              name,
              assignToId: id,
            }),
          );
        }}
      >
        <label htmlFor="name">Name</label>
        <input name="name" type="text" className="border border-black p-1" />
        <label htmlFor="user">AssignTo</label>
        <select className="p-1" name="user">
          <option value="">Select user</option>;
          {users.map((user) => {
            return <option value={user.id}>{user.username}</option>;
          })}
        </select>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TaskList;
