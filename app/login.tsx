// screens/Register.tsx
import { View, Text} from "react-native";
import { Controller } from "react-hook-form";
import { useLogin } from "../store/hooks/useLogin";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomTextInput";
import { useState } from "react";
import SeePasswordButton from "@/components/SeePasswordButton";
import SubmitButton from "@/components/SubmitButton";
import { Link } from "expo-router";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export default function Login() {
  const { form, isSubmitting, error, onSubmit } = useLogin();
  const {
    control,
    formState: { errors },
  } = form;

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  return (
    <SafeAreaView className="h-full">
      <View className="flex-1 bg-white p-[30px]">
        <View className="flex mb-[35px] mt-[30px]">
          <Text
            className=" font-poppins-bold text-[40px] leading-none"
            style={{ lineHeight: 45 }}
          >
            Welcome
          </Text>
          <Text
            className=" font-poppins-bold text-[40px] leading-none"
            style={{ color: "#E25822", lineHeight: 45 }}
          >
            back!
          </Text>
        </View>
        <Text className=" font-poppins-light text-[12px] mb-[35px]">
        Sign in to access your account and explore more
        </Text>
        <View className="space-y-4">

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

            <Link href="/requestResetPassword" className=" font-poppins text-[12px] self-end mr-[20px] pb-1" style={{ color: "#E25822"}}>Forgot password</Link>
          {/* Submit Button */}
          <View className="mt-[15px]">
            <View className="w-full flex justify-center gap-[35px]">
              <SubmitButton
                onPress={onSubmit}
                isSubmitting={isSubmitting}
                buttonText="Sign in"
                disabled={isSubmitting}
              />
              <Text className="self-center font-poppins">Or</Text>
              <GoogleAuthButton role="buyer"/>
              <View className="flex flex-row justify-center items-center">
                <Text className="text-[12px] font-poppins-light">
                Don’t have an account?{" "}
                </Text>
                <Link
                  className=" self-center font-poppins-semibold text-[12px]"
                  style={{ color: "#E25822" }}
                  href="/register"
                >
                  Sign up
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
