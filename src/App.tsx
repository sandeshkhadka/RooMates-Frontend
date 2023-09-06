import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div className="flex flex-row gap-3">
      <Sidebar />
      <Outlet />
    </div>
  );
}
