import { Link } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import { useAppDispatch } from "../lib/hooks";
import { logOut as logOut } from "../features/authentication-slice";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  function logoutHandler() {
    dispatch(logOut());
  }
  return (
    <div className="sidebar w-1/5 h-screen text-white bg-teal-700 p-5 ">
      <ProfileInfo />
      <ul className="list-none mt-4 text-xl">
        <li>
          <Link to={"/"}>Dashboard</Link>
        </li>
        <li>
          <Link to={"contributions"}>Contributions</Link>
        </li>
        <li>
          <Link to={"tasks"}>Tasks</Link>
        </li>
        <li>
          <Link to={"chat"}>Chat</Link>
        </li>
        <li>
          <Link to={"settings"}>Settings</Link>
        </li>
        <li>
          <button type="button" onClick={logoutHandler}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
