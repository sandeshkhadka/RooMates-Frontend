import { API_URL } from "../lib/config";
import { useRef, useState } from "react";
const SignUp = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const feedBackRef = useRef<HTMLDivElement>(null);
  const usernameErrorRef = useRef<HTMLDivElement>(null);
  const emailErrorRef = useRef<HTMLDivElement>(null);
  return (
    <div className="h-screen gap-3 flex flex-col justify-center items-center">
      <div
        ref={feedBackRef}
        className={success ? "text-green-700 text-3xl" : "text-red-200"}
      >
        {" "}
      </div>
      <div
        ref={formRef}
        className="w-full gap-3 flex flex-col justify-center items-center"
      >
        <h1 className="text-3xl"> Create a new account </h1>
        <form
          className="flex flex-col gap-2 border w-1/4 h-fit m-2 p-2"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const username = formData.get("username")?.toString();
            // const password = formData.get("password")?.toString();
            const email = formData.get("email")?.toString();
            if (!(username && email)) {
              return;
            }
            const response = fetch(`${API_URL}/request_signup`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, email }),
            });
            void response.then((res) => {
              if (res.ok) {
                formRef.current?.classList.add("hidden");
                setSuccess(true);
                feedBackRef.current!.innerText =
                  "Please check your email for verification link!";
              } else {
                void res.json().then((response: { msg: string }) => {
                  if (response.msg == "USERNAME ERROR") {
                    usernameErrorRef.current!.innerText =
                      "Choose a differnet username.";
                  } else if (response.msg == "EMAIL ERROR") {
                    emailErrorRef.current!.innerText =
                      "Choose a different email.";
                  } else {
                    setSuccess(false);
                    feedBackRef.current!.innerText =
                      "Something went wrong. Please try again !";
                  }
                });
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
          <span ref={usernameErrorRef} className="bg-red-600"></span>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" className="border border-black p-1" />
          <span ref={emailErrorRef} className="bg-red-600"></span>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
