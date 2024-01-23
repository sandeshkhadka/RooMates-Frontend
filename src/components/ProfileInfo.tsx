import { useAuth } from "../lib/hooks";
import { API_URL } from "../lib/config";
import { useEffect, useState } from "react";
const ProfileInfo = () => {
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
    <div className="flex flex-col items-center text-center ">
      <img src={imageUrl} className="h-28 w-28 bg-sky-500 rounded-full"></img>
      <div className="info">
        <p className="text-xs">@{auth.user?.username}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
