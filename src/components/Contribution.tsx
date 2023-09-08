import { useEffect, useState } from "react";
import { dummyUserResponse } from "../assets/data";
import DeleteIcon from "./Delete";
type ContributionProps = {
  contribution: ContributionType;
};
const Contribution = (parms: ContributionProps) => {
  const contribution = parms.contribution;
  const [username, setUsername] = useState("");
  useEffect(() => {
    const userId = contribution.belongsToId;
    const user = dummyUserResponse.users.find((user) => user.id === userId);
    const username = user!.username;
    setUsername(username);
  }, [contribution.belongsToId]);
  return (
    <div className="flex flex-col px-4 border bg-sky-200">
      <div className="flex flex-row justify-between">
        <div>{username}</div>
        <div className="text-xl font-bold">Rs {contribution.amount}</div>
      </div>
      <div>Bought: {contribution.name}</div>
      <div className="flex justify-between">
        <div className="italic ">type: {contribution.type}</div>
        <div>{contribution.passed ? <>Passed</> : <>NotPassed</>}</div>
        <div className="cursor-pointer">

        <DeleteIcon />
        </div>
      </div>
    </div>
  );
};

export default Contribution;
