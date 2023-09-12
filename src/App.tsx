import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useAppDispatch, useAuth, useUsers } from "./lib/hooks";
import SignIn from "./components/SignIn";
import { useEffect } from "react";
import { fetchUsers } from "./features/user-slice";

export default function App() {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const user = useUsers();
  useEffect(() => {
    if (auth.loggedIn) {
      if (!user.length) void dispatch(fetchUsers());
    }
  }, [auth.loggedIn, dispatch, user.length]);
  return (
    <div>
      {auth.loggedIn ? (
        <div className="flex flex-row gap-2">
          <Sidebar />
          <Outlet />
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
