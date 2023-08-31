const ProfileInfo = () => {
  return (
    <div className="flex flex-col items-center text-center ">
      <div className="h-28 w-28 bg-sky-500 rounded-full"></div>
      <div className="info">
        <p className="text-xl">Firstname Lastname</p>
        <p className="text-xs">@username</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
