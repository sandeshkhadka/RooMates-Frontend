import { dummyTaskResponse } from "../assets/data";
import Task from "../components/Task";

const TaskList = () => {
  const tasklist = dummyTaskResponse.tasks;
  return (
    <div className="w-full flex flex-row gap-2">
      <div className="w-1/2 flex flex-col gap-2 py-2">
        {tasklist.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </div>
      <form
        className="flex flex-col gap-2 border w-1/2 h-fit m-2 p-2"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="name">Name</label>
        <input name="name" type="text" className="border border-black p-1" />
        <label htmlFor="type">Type</label>
        <select className="p-1"></select>
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
