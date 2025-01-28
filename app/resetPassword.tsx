// screens/Register.tsx
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomTextInput";
import SubmitButton from "@/components/SubmitButton";
import { Link } from "expo-router";
import { useValidateOtp } from "@/store/hooks/useValidateOtp";
import { useRecoilValue } from "recoil";
import { emailState } from "@/store/atom/emailAtom";
import CustomBlankInput from "@/components/CustomBlankInput";
import { useResetPassword } from "@/store/hooks/useResetPassword";
import { useState } from "react";
import SeePasswordButton from "@/components/SeePasswordButton";

export default function ResetPassword() {
  const { form, isSubmitting, error, onSubmit } = useResetPassword();
  const {
    control,
    formState: { errors },
  } = form;
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(true);

  return (
    <SafeAreaView className="h-full">
      <View className="flex-1 bg-white p-[30px]">
        <View className="flex mb-[35px] mt-[30px]">
          <Text
            className=" font-poppins-bold text-[40px] leading-none"
            style={{ lineHeight: 45 }}
          >
            Set new
          </Text>
          <Text
            className=" font-poppins-bold text-[40px] leading-none"
            style={{ color: "#E25822", lineHeight: 45 }}
          >
            password
          </Text>
        </View>
        <Text className=" font-poppins-light text-[12px] mb-[35px]">
        Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.
        </Text>
        <View className="space-y-4">
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
                buttonText="Continue"
                disabled={isSubmitting}
              />
              <View className="flex flex-row items-center justify-center gap-2">
                <Image
                  style={{
                    flex: 0,
                    width: 16,
                    height: 16,
                  }}
                  source={require("../assets/icons/arrow-back.png")}
                  contentFit="cover"
                  transition={1000}
                />
                <Link href="/login">
                  <Text className="font-poppins-light text-[12px]">Back to sign in</Text>
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
