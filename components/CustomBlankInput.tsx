// CustomInput.tsx
import React from "react";
import {
  View,
  TextInput,
  Text,
  TextInputProps,
  Image,
  ImageSourcePropType,
} from "react-native";

interface CustomInputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  errorMessage?: string;
  secureTextEntry?: boolean;
}

const CustomBlankInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  errorMessage,
  secureTextEntry = false,
  ...rest
}) => {
  return (
    <View className="mb-[20px]">
      <View className="border border-gray-300 rounded-full h-[50px] flex flex-row items-center justify-center">
        <View className="flex flex-row w-full items-center justify-center">
          <TextInput
            className="flex-1 text-[12px] font-poppins placeholder:text-gray-400 w-full text-center items-center"
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            secureTextEntry={secureTextEntry}
            {...rest} // Pass any additional props to TextInput
          />
        </View>
      </View>
      <View>
        {errorMessage && (
          <Text className="font-poppins-light text-red-500 text-sm mt-1 ml-[20px]">{errorMessage}</Text>
        )}
      </View>
    </View>
  );
};

export default CustomBlankInput;
