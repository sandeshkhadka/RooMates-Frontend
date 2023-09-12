import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type TaskState = {
  entities: Task[];
};

type TaskFetchApiResponse = {
  tasks: Task[];
};

type TaskPostApiResponse = {
  task: Task;
};
type UpdateTaskApiResponse = {
  updatedTask: Task;
};
const initialState: TaskState = {
  entities: [],
};

export const fetchTask = createAsyncThunk("task/fetch", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("Task fetch failed, No token");
    return;
  }
  const response = await fetch("http://127.0.0.1:3000/api/task", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.log("Task fetch response not ok");
    return;
  }
  const responseObj = (await response.json()) as TaskFetchApiResponse;

  return responseObj.tasks;
});
type DraftTask = {
  name: string;
  assignToId: string;
};
export const postTask = createAsyncThunk(
  "task/post",
  async (draft: DraftTask) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Task fetch failed, No token");
      return;
    }
    const response = await fetch("http://127.0.0.1:3000/api/task", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(draft),
    });
    if (!response.ok) {
      console.log("Task post response not ok");
      console.log(response);
      return;
    }
    const responseObj = (await response.json()) as TaskPostApiResponse;

    return responseObj.task;
  },
);
type UpdateTaskProps = {
  id: string;
  name: string;
  status: "Pending" | "Completed" | "Missed";
};
export const updateTask = createAsyncThunk(
  "task/update",
  async (task: UpdateTaskProps) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token");
      return;
    }

    const draftTask = {
      name: task.name,
      status: task.status,
    };
    const response = await fetch(`http://127.0.0.1:3000/api/task/${task.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(draftTask),
    });
    const responseObj = (await response.json()) as UpdateTaskApiResponse;
    console.log(responseObj);
    return responseObj.updatedTask;
  },
);
type DeleteTaskApiResponse = {
  deletedTask: Task;
};
export const deleteTask = createAsyncThunk(
  "task/delete",
  async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token");
      return;
    }
    const response = await fetch(`http://127.0.0.1:3000/api/task/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseObj = (await response.json()) as DeleteTaskApiResponse;
    return responseObj.deletedTask;
  },
);
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.entities.unshift(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const updatedTask = action.payload;
      const taskId = updatedTask.id;
      const index = state.entities.findIndex((task) => task.id === taskId);
      state.entities[index] = updatedTask;
    },
    removeTask: (state, action: PayloadAction<Task>) => {
      const deletedTask = action.payload;

      const index = state.entities.findIndex(
        (task) => task.id === deletedTask.id,
      );

      state.entities.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTask.fulfilled, (state, action) => {
        const tasks = action.payload;
        if (!tasks) {
          console.log("Got Empty task list");
          return;
        }
        state.entities = tasks;
      })
      .addCase(postTask.fulfilled, (state, action) => {
        const task = action.payload;
        if (!task) {
          console.log("reducer did not get task");
          return;
        }
        taskSlice.caseReducers.addTask(state, taskSlice.actions.addTask(task));
      })
      .addCase("auth/logOut", (state) => {
        state.entities = [];
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        if (!updatedTask) {
          console.log("reducer got undefined obj");
          return;
        }
        if (!updatedTask.id) {
          console.log("reducer did not get a task");
        }
        taskSlice.caseReducers.updateTask(
          state,
          taskSlice.actions.updateTask(updatedTask),
        );
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const deletedTask = action.payload;
        if (!deletedTask) {
          console.log("reducer got no task");
          return;
        }
        taskSlice.caseReducers.removeTask(
          state,
          taskSlice.actions.removeTask(deletedTask),
        );
      });
  },
});

export const taskReducer = taskSlice.reducer;
export const { addTask } = taskSlice.actions;
