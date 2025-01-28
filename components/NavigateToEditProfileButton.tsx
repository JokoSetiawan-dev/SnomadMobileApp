// components/LogoutButton.tsx
import { TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useUser } from "@/store/hooks/useUser";
import { userState } from "@/store/atom/authAtom";
import { useSetRecoilState } from "recoil";

const NavigateToEditProfileButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { getUserFromStorage } = useUser();
  const setUser = useSetRecoilState(userState);

  const onPress = async () => {
    setIsLoading(true);
    try {
      const userData = await getUserFromStorage();
      setUser(userData);
      router.replace("/editProfile");
    } catch (error) {
      console.error("Navigate to edit profile failed:", error);
      // You might want to show an error toast here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      className={`border border-gray-400 rounded-full h-[30px] items-center justify-center w-[100px] ${
        isLoading ? "opacity-50" : ""
      }`}
      onPress={onPress}
      disabled={isLoading}
    >
      <Text className="text-[12px] font-poppins-medium">Edit profile</Text>
    </TouchableOpacity>
  );
};

export default NavigateToEditProfileButton;
