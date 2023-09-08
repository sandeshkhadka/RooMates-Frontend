import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Playground from "./Playground.tsx";
import Contribution from "./routes/ContributionList.tsx";
import TaskList from "./routes/TaskList.tsx";
import Chat from "./routes/Chat.tsx";
import Dashboard from "./routes/Dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/contributions",
        element: <Contribution />,
      },
      {
        path: "/tasks",
        element: <TaskList />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
    ],
  },
  {
    path: "/play",
    element: <Playground />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
