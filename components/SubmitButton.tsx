import { TouchableOpacity, Text } from "react-native";

interface SubmitButtonProps {
    onPress: () => void;
    isSubmitting: boolean;
    buttonText: string;
    disabled?: boolean;
  }
  
  const SubmitButton: React.FC<SubmitButtonProps> = ({
    onPress,
    isSubmitting,
    buttonText,
    disabled = false,
  }) => {
    return (
        <TouchableOpacity
            className={`bg-[#E25822] h-[50px] rounded-full flex flex-row justify-center ${
                isSubmitting ? "opacity-50" : ""
            }`}
            onPress={onPress}
            disabled={isSubmitting || disabled}
        >
            <Text className="text-white text-center font-poppins-semibold text-[14px] self-center">
                {buttonText}
            </Text>
        </TouchableOpacity>
    );
};

export default SubmitButton;