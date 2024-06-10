import { useForm } from "@mantine/form";
import { Button, Container, Flex, TextInput } from "@mantine/core";
import { FormEvent, useState } from "react";
import { useAppDispatch, useAuth } from "../lib/hooks";
import { API_URL } from "../lib/config";
import { hydrateLogin } from "../features/authentication-slice";
import styles from "./Settings.module.css"
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

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: auth.user.username,
      oldPassword: "",
      newPassword: "",
      verifyNewPassword: "",
      email: auth.user.email
    }

  });

  const handleSaveChanges = form.onSubmit((values) => {
    if (!(auth.user && auth.token)) {
      return;
    }
    const username = values.username;
    const password = values.newPassword
    const password2 = values.verifyNewPassword
    const oldpassword = values.oldPassword
    const email = values.email
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
    if (password && oldpassword && password2 && password == password2) {
      const response = fetch(`${API_URL}/api/settings/password`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: oldpassword,
          newPassword: password,
        }),
      });
      response
        .then((res) => {
          if (res.ok) {
            setEditingPassword(false);
            alert("Password changed");
          } else {
            alert("Could not update password");
          }
        })
        .catch(() => {
          return;
        });
    }
  })
  return (

    <Container mt="sm" ml="sm" w="100%">
      <form >
        <Flex align="center">
          <TextInput
            label="Username"
            classNames={
              {
                label: styles.label,
                input: styles.input
              }
            }
            key={form.key("username")}
            {...form.getInputProps("username")}
            disabled={!isEditingUsername}
          />
          <Button
            type="button"
            size="md"
            classNames={
              {
                root: styles.button
              }
            }
            fw="normal"
            onClick={() => setEditingUsername(!isEditingUsername)}
          >
            {isEditingUsername ? "Cancel" : "Edit"}
          </Button>
        </Flex>

        <Flex align="center">
          <TextInput
            type="password"
            label="Old Password"
            classNames={
              {
                label: styles.label,
                input: styles.input,
              }
            }
            key={form.key("oldPassword")}
            {...form.getInputProps("oldPassword")}
            disabled={!isEditingPassword}
          />
          <Button
            type="button"
            size="md"
            classNames={
              {
                root: styles.button
              }
            }
            fw="normal"

            onClick={() => setEditingPassword(!isEditingPassword)}
          >
            {isEditingPassword ? "Cancel" : "Edit"}
          </Button>
        </Flex>
        <Flex align="center">
          <TextInput
            label="New Password"
            type="password"
            classNames={
              {

                label: styles.label,
                input: styles.input,
              }
            }
            key={form.key("newPassword")}
            {...form.getInputProps("newPassword")}
            disabled={!isEditingPassword}
          />
          <Button
            type="button"
            classNames={
              {
                root: styles.button
              }
            }
            onClick={() => setEditingPassword(!isEditingPassword)}
          >
            {isEditingPassword ? "Cancel" : "Edit"}
          </Button>
        </Flex>
        <Flex align="center">
          <TextInput
            type="password"
            label="Verify New Password"
            classNames={
              {
                input: styles.input,
                label: styles.label
              }
            }
            key={form.key("verifyNewPassword")}
            {...form.getInputProps("verifyNewPassword")}
            disabled={!isEditingPassword}
          />
          <Button
            type="button"
            classNames={{
              root: styles.button
            }}
            onClick={() => setEditingPassword(!isEditingPassword)}
          >
            {isEditingPassword ? "Cancel" : "Edit"}
          </Button>
        </Flex>

        <Flex align="center">
          <TextInput
            type="text"
            label="Email"
            classNames={
              {
                input: styles.input,
                label: styles.label
              }
            }
            defaultValue={auth.user.email}
            disabled={!isEditingEmail}
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <Button
            type="button"
            classNames={
              {
                root: styles.button
              }
            }
            onClick={() => setEditingEmail(!isEditingEmail)}
          >
            {isEditingEmail ? "Cancel" : "Edit"}
          </Button>
        </Flex>

        <Button
          type="submit"
          bg="blue"
          c="white"
          mt="md"
          px="xl"
          size="compact-xl"
        >
          Save Changes
        </Button>
      </form>
    </Container >
  );
};
