import DeleteIcon from "./Delete";
import { useAppDispatch, useAuth, useUsername } from "../lib/hooks";
import { deleteContribution } from "../features/contribution-slice";

type ContributionProps = {
  contribution: ContributionType;
};

const Contribution = (parms: ContributionProps) => {
  const contribution = parms.contribution;
  const dispatch = useAppDispatch();

  const username = useUsername(contribution.belongsToId);
  const auth = useAuth();

  const ownsThis = contribution.belongsToId === auth.user!.id;

  function handleDelete() {
    void dispatch(deleteContribution(contribution.id));
  }

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
        <div className="cursor-pointer" onClick={handleDelete}>
          {ownsThis ? <DeleteIcon /> : null}
        </div>
      </div>
    </div>
  );
};

export default Contribution;
