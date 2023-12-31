import { useNavigate } from "react-router-dom";
import { API_URL } from "../lib/config";
const SignUp = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen gap-3 flex flex-col justify-center items-center">
      <h1 className="text-3xl"> Create a new account </h1>
      <form
        className="flex flex-col gap-2 border w-1/4 h-fit m-2 p-2"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const username = formData.get("username")?.toString();
          const password = formData.get("password")?.toString();
          const email = formData.get("email")?.toString();
          if (!(username && password && email)) {
            return;
          }
          const response = fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, email }),
          });
          void response.then((res) => {
            if (res.ok) {
              navigate("/");
            } else {
              alert("Could not sign up. Try using a different username.");
            }
          });
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          className="border border-black p-1"
        />
        <label htmlFor="email">Email</label>
        <input type="text" name="email" className="border border-black p-1" />
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
