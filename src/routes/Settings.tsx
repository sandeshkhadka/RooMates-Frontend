import { FormEvent, useState } from "react";
import { useAppDispatch, useAuth } from "../lib/hooks";
import { API_URL } from "../lib/config";
import { hydrateLogin } from "../features/authentication-slice";

type UpdateUsernameResponse = {
  old_username: string;
  token: string;
  updated_username: string;
  userid: string;
};
export const SettingsPage = () => {
  const [isEditingUsername, setEditingUsername] = useState(false);
  const [isEditingPassword, setEditingPassword] = useState(false);
  const [isEditingEmail, setEditingEmail] = useState(false);
  const auth = useAuth();
  const dispatch = useAppDispatch();
  if (!auth.user) {
    return <>Not authorized </>;
  }

  const handleSaveChanges = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(auth.user && auth.token)) {
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    const password2 = formData.get("password2")?.toString();
    const email = formData.get("email")?.toString();
    console.log({
      username,
      password,
      password2,
      email,
    });

    if (username && username != auth.user.username) {
      const response = fetch(`${API_URL}/api/settings/username`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newUsername: username,
        }),
      });
      response
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            alert("Could not update username");
          }
        })
        .then((data: UpdateUsernameResponse) => {
          localStorage.setItem("token", data.token);
          void dispatch(hydrateLogin());
          console.log(data);
        })
        .catch(() => {
          return;
        });
    }
    if (email && email != auth.user.email) {
      console.log("Should sent req to email");
    }
    if (password && password2 && password == password2) {
      console.log("Should sent req to password");
    }
  };

  return (
    <div className="mt-8 ml-8">
      <form onSubmit={handleSaveChanges}>
        <div className="mb-4">
          <label htmlFor="username" className="text-gray-700 font-semibold">
            Username
          </label>
          <div className="flex items-center">
            <input
              type="text"
              name="username"
              className={`border-b border-gray-300 outline-none flex-grow ${isEditingUsername ? "cursor-text" : "cursor-not-allowed"
                }`}
              defaultValue={auth.user.username}
              disabled={!isEditingUsername}
            />
            <button
              type="button"
              className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
              onClick={() => setEditingUsername(!isEditingUsername)}
            >
              {isEditingUsername ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-gray-700 font-semibold">
            New Password
          </label>
          <div className="flex items-center">
            <input
              type="password"
              name="password"
              className={`border-b border-gray-300 outline-none flex-grow ${isEditingPassword ? "cursor-text" : "cursor-not-allowed"
                }`}
              disabled={!isEditingPassword}
            />
            <button
              type="button"
              className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
              onClick={() => setEditingPassword(!isEditingPassword)}
            >
              {isEditingPassword ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password2" className="text-gray-700 font-semibold">
            Verify New Password
          </label>
          <div className="flex items-center">
            <input
              type="password"
              name="password2"
              className={`border-b border-gray-300 outline-none flex-grow ${isEditingPassword ? "cursor-text" : "cursor-not-allowed"
                }`}
              disabled={!isEditingPassword}
            />
            <button
              type="button"
              className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
              onClick={() => setEditingPassword(!isEditingPassword)}
            >
              {isEditingPassword ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="text-gray-700 font-semibold">
            Email
          </label>
          <div className="flex items-center">
            <input
              type="text"
              name="email"
              className={`border-b border-gray-300 outline-none flex-grow ${isEditingEmail ? "cursor-text" : "cursor-not-allowed"
                }`}
              defaultValue={auth.user.email}
              disabled={!isEditingEmail}
            />
            <button
              type="button"
              className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
              onClick={() => setEditingEmail(!isEditingEmail)}
            >
              {isEditingEmail ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};
