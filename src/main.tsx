import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Playground from "./Playground.tsx";
import Contribution from "./routes/ContributionList.tsx";
import TaskList from "./routes/TaskList.tsx";
import Chat from "./routes/Chat.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import { Provider } from "react-redux";
import store from "./lib/store.ts";
import SignUp from "./components/SignUp.tsx";
import { CreateUser } from "./components/CreateUser.tsx";
import { SettingsPage } from "./routes/Settings.tsx";
import "@mantine/core/styles.layer.css";
import '@mantine/charts/styles.css';
import { MantineProvider } from "@mantine/core";
// import { hydrateLogin } from "./features/authentication-slice.ts";

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
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "/play",
    element: <Playground />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/create_user",
    element: <CreateUser />,
  },
]);
// await store.dispatch(hydrateLogin());
ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </MantineProvider>
);
