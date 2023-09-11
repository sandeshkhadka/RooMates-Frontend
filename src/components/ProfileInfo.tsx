import { useAuth } from "../lib/hooks";

const ProfileInfo = () => {
  const auth = useAuth();
  return (
    <div className="flex flex-col items-center text-center ">
      <div className="h-28 w-28 bg-sky-500 rounded-full"></div>
      <div className="info">
        <p className="text-xs">@{auth.user?.username}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
