import ProfileInfo from "./ProfileInfo";

const Sidebar = () => {
  return (
    <div className="sidebar w-1/5 h-screen text-white bg-teal-700 p-5 ">
      <ProfileInfo />
      <ul className="list-none mt-4 text-xl">
        <li>Contributions</li>
        <li>Tasks</li>
        <li>Chat</li>
      </ul>
    </div>
  );
};

export default Sidebar;
