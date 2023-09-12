import { useEffect } from "react";
import Contribution from "../components/Contribution";
import { useAppDispatch, useContributions } from "../lib/hooks";
import {
  DraftContribution,
  fetchContribution,
  postContribution,
} from "../features/contribution-slice";
const ContributionTypes = [
  "vegetables",
  "water",
  "nonVegs",
  "khaja",
  "gas",
  "payments",
  "others",
];

const ContributionList = () => {
  const contributions: ContributionType[] = useContributions();
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(fetchContribution());
  }, [dispatch]);
  return (
    <div className="w-full flex flex-row gap-2">
      <div className="w-1/2 overflow-scroll no-scrollbar flex flex-col gap-2 py-2">
        {contributions.map((contrib) => (
          <Contribution contribution={contrib} key={contrib.id} />
        ))}
      </div>
      <form
        className="flex flex-col gap-2 border w-1/2 h-fit m-2 p-2"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const name = formData.get("name")?.toString();
          const amount = formData.get("amount")?.toString();
          const type = formData.get("type")?.toString();
          if (name && amount && type) {
            const amountInt = parseInt(amount);
            const draftContribution: DraftContribution = {
              name,
              amount: amountInt,
              type,
            };
            void dispatch(postContribution(draftContribution));
          }
        }}
      >
        <label htmlFor="name">Name</label>
        <input name="name" type="text" className="border border-black p-1" />
        <label htmlFor="amount">Amount</label>
        <input
          name="amount"
          type="number"
          className="border border-black p-1"
        />
        <label htmlFor="type">Type</label>
        <select className="p-1" name="type">
          {ContributionTypes.map((contrib) => (
            <option value={contrib} className="p-1">
              {contrib}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContributionList;
