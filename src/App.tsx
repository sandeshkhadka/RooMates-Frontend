import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./lib/hooks";
import SignIn from "./components/SignIn";

export default function App() {
  const auth = useAuth();
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
