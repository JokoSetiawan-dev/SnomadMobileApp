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
  placeholder: any;
  value: string;
  onChangeText: (text: string) => void;
  errorMessage?: string;
  secureTextEntry?: boolean;
  iconSource?: ImageSourcePropType;
  additionalButton?: React.ReactNode;
}

const CustomInput: React.FC<CustomInputProps> = ({
  iconSource,
  placeholder,
  value,
  onChangeText,
  errorMessage,
  secureTextEntry = false,
  additionalButton,
  ...rest
}) => {
  return (
    <View className="mb-[20px]">
      <View className="border border-gray-300 rounded-full h-[50px] flex flex-row items-center justify-center">
        <View className="flex flex-row w-full items-center">
          <Image
            source={iconSource}
            style={{ width: 20, height: 20, marginLeft: 20, marginRight: 20 }}
          />
          <TextInput
            className="flex-1 text-[12px] font-poppins placeholder:text-gray-400 w-full"
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            secureTextEntry={secureTextEntry}
            {...rest} // Pass any additional props to TextInput
          />
          <View className="w-[20px] mx-[20px]">{additionalButton}</View>
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

export default CustomInput;
