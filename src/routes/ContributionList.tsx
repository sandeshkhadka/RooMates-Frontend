import { dummyContriResponse } from "../assets/data";
import Contribution from "../components/Contribution";
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
  const contributions = dummyContriResponse.entities.reverse();
  return (
    <div className="w-full flex flex-row gap-2">
      <div className="w-1/2 flex flex-col gap-2 py-2">
        {contributions.map((contrib) => (
          <Contribution contribution={contrib} />
        ))}
      </div>
      <form
        className="flex flex-col gap-2 border w-1/2 h-fit m-2 p-2"
        onSubmit={(e) => {
          e.preventDefault();
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
        <select className="p-1">
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
