// screens/Register.tsx
import { View, Text, TextInput, TouchableOpacity, Switch } from "react-native";
import { Controller } from "react-hook-form";
import { useRegister } from "../store/hooks/useRegister";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomTextInput";
import { useState } from "react";
import SeePasswordButton from "@/components/SeePasswordButton";
import SubmitButton from "@/components/SubmitButton";
import { Link } from "expo-router";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export default function Register() {
  const { form, isSubmitting, error, onSubmit, selectedRole, setSelectedRole } = useRegister();
  const {
    control,
    formState: { errors },
  } = form;

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(true);

  const toggleRole = () => {
    setSelectedRole(prev => prev === "buyer" ? "seller" : "buyer");
  };

  return (
    <SafeAreaView className="h-full">
      <View className="flex-1 bg-white p-[30px]">
        <View className="flex mb-[25px] mt-[30px]">
          <Text
            className=" font-poppins-bold text-[40px] leading-none"
            style={{ lineHeight: 45 }}
          >
            Hello
          </Text>
          <Text
            className=" font-poppins-bold text-[40px] leading-none"
            style={{ color: "#E25822", lineHeight: 45 }}
          >
            there!
          </Text>
        </View>
        <View className="flex-row items-center justify-center gap-3 mb-[25px]">
          <Text className="font-poppins-medium text-[12px]">Buyer</Text>
          <Switch
            trackColor={{ false: '#E25822', true: '#E25822' }}
            thumbColor={selectedRole === "seller" ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleRole}
            value={selectedRole === "seller"}
          />
          <Text className="font-poppins-medium text-[12px]">Seller</Text>
        </View>
        <View className="space-y-4">
          {/* Name Input */}
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <CustomInput
                iconSource={require("../assets/icons/person4.png")}
                placeholder="Enter your name"
                value={value}
                onChangeText={onChange}
                secureTextEntry={false}
                errorMessage={errors.name?.message}
              />
            )}
          />

          {/* Email Input */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <CustomInput
                iconSource={require("../assets/icons/mail.png")}
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                secureTextEntry={false}
                errorMessage={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          {/* Password Input */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <CustomInput
                iconSource={require("../assets/icons/lock-closed.png")}
                placeholder="Create password"
                value={value}
                onChangeText={onChange}
                secureTextEntry={isPasswordVisible}
                errorMessage={errors.password?.message}
                additionalButton={
                  <SeePasswordButton
                    isSecure={isPasswordVisible}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                }
              />
            )}
          />

          {/* Confirm Password Input */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <CustomInput
                iconSource={require("../assets/icons/lock-closed.png")}
                placeholder="Re-type your password"
                value={value}
                onChangeText={onChange}
                secureTextEntry={isConfirmPasswordVisible}
                errorMessage={errors.confirmPassword?.message}
                additionalButton={
                  <SeePasswordButton
                    isSecure={isConfirmPasswordVisible}
                    onPress={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                  />
                }
              />
            )}
          />

          {/* Submit Button */}
          <View className="mt-[15px]">
            <View className="w-full flex justify-center gap-[35px]">
              <SubmitButton
                onPress={onSubmit}
                isSubmitting={isSubmitting}
                buttonText="Create Account"
                disabled={isSubmitting}
              />
              <Text className="self-center font-poppins">Or</Text>
              <GoogleAuthButton role="buyer" />
              <View className="flex flex-row justify-center items-center">
                <Text className="text-[12px] font-poppins-light">
                  Already have an account?{" "}
                </Text>
                <Link
                  className=" self-center font-poppins-semibold text-[12px]"
                  style={{ color: "#E25822" }}
                  href="/login"
                >
                  Sign in
                </Link>
              </View>
            </View>
          </View>

          {/* Error Message */}
          {error && <Text className="text-red-500 text-center">{error}</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
}
