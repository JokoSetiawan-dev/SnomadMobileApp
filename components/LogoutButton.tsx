// components/LogoutButton.tsx
import { TouchableOpacity, Text } from "react-native";
import { useLogout } from "@/store/hooks/useLogout";

const LogoutButton = () => {
    const { logout, isLoading } = useLogout();

    return (
        <TouchableOpacity
            className={`bg-[#E25822] p-4 rounded-full ${
                isLoading ? "opacity-50" : ""
            }`}
            onPress={logout}
            disabled={isLoading}
        >
            <Text className="text-white text-center font-poppins-semibold">
                {isLoading ? "Logging Out..." : "Logout"}
            </Text>
        </TouchableOpacity>
    );
};

export default LogoutButton;