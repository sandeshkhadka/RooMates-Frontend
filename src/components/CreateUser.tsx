import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_URL } from "../lib/config";

export const CreateUser = () => {
  const [searchparams, _] = useSearchParams();
  const token = searchparams.get("token");
  const feedBackRef = useRef<HTMLDivElement>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="h-screen gap-3 flex flex-col justify-center items-center">
      <div
        ref={feedBackRef}
        className={success ? "bg-green-200" : "bg-red-200"}
      ></div>
      <h1 className="text-3xl">Set your password</h1>
      <form
        className="flex flex-col gap-2 border w-1/4 h-fit m-2 p-2"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const password = formData.get("password")?.toString();
          if (!(password && token)) {
            return;
          }
          const response = fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password, token }),
          });
          void response.then((res) => {
            if (res.ok) {
              navigate("/");
            } else {
              setSuccess(false);
              feedBackRef.current!.innerText = "Invalid or expired link !";
            }
          });
        }}
      >
        <label htmlFor="password">password</label>
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
