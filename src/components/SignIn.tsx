import { useNavigate } from "react-router-dom";
import { logIn } from "../features/authentication-slice";
import { useAppDispatch } from "../lib/hooks";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className="h-screen gap-3 flex flex-col justify-center items-center">
      <h1 className="text-3xl"> Login </h1>
      <form
        className="flex flex-col gap-2 border w-1/4 h-fit m-2 p-2"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const username = formData.get("username")?.toString();
          const password = formData.get("password")?.toString();
          if (!(username && password)) {
            return;
          }
          void dispatch(
            logIn({
              username,
              password,
            }),
          ).then(() => {
            navigate("/");
          });
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          className="border border-black p-1"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className="border border-black p-1"
        />
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

export default SignIn;
