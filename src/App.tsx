import { Flex } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useAppDispatch, useAuth, useUsers } from "./lib/hooks";
import SignIn from "./components/SignIn";
import { useEffect } from "react";
import { fetchUsers } from "./features/user-slice";
import { hydrateLogin } from "./features/authentication-slice.ts";

export default function App() {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const user = useUsers();
  useEffect(() => {
    void dispatch(hydrateLogin());
    if (auth.loggedIn) {
      if (!user.length) void dispatch(fetchUsers());
    }
  }, [auth.loggedIn, dispatch, user.length]);
  return (
    auth.loggedIn ? (
      <Flex gap="2px" h="100vh">
        <Sidebar />
        <Outlet />
      </Flex>
    ) : (
      <SignIn />
    )
  );
}
