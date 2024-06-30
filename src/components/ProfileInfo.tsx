import { useAuth } from "../lib/hooks";
import { API_URL } from "../lib/config";
import { useEffect, useState } from "react";
import { UnstyledButton, Group, Avatar, Text } from "@mantine/core";
import classes from "./ProfileInfo.module.css";

export function ProfileInfo() {
  const auth = useAuth();
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    async function fetchImage() {
      if (!auth.token) {
        return;
      }
      const userId = auth.user?.id;
      if (!userId) {
        return;
      }

      const profilePictureUrl = `${API_URL}/api/profile_picture/id/${userId}`;
      try {
        const response = await fetch(profilePictureUrl, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        const binaryImage = await response.blob();
        const url = URL.createObjectURL(binaryImage);
        setImageUrl(url);
      } catch (e) {
        console.log(e);
      }
    }
    void fetchImage();
  }, [auth]);

  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar src={imageUrl} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {auth.user?.username}
          </Text>

          <Text c="dimmed" size="xs">
            {auth.user?.email}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
}
export default ProfileInfo;
