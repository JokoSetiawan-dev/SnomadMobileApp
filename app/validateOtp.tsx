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

export default function ValidateOtp() {
  const { form, isSubmitting, error, onSubmit } = useValidateOtp();
  const {
    control,
    formState: { errors },
  } = form;
  const email = useRecoilValue(emailState) || "youremail@gmail.com";
  console.log(email);
  

  return (
    <SafeAreaView className="h-full">
      <View className="flex-1 bg-white p-[30px]">
        <View className="flex mb-[35px] mt-[30px]">
          <Text
            className=" font-poppins-bold text-[40px] leading-none"
            style={{ lineHeight: 45 }}
          >
            Password
          </Text>
          <Text
            className=" font-poppins-bold text-[40px] leading-none"
            style={{ color: "#E25822", lineHeight: 45 }}
          >
            reset
          </Text>
        </View>
        <Text className=" font-poppins-light text-[12px] mb-[35px]">
        An OTP code has been sent to <Text style={{ color: "#E25822"}}>{email}</Text>. Please check your inbox and enter the code to proceed. 
        </Text>
        <View className="space-y-4">
          {/* Email Input */}
          <Controller
            control={control}
            name="otp"
            render={({ field: { onChange, value } }) => (
              <CustomBlankInput
                placeholder="Enter your OTP code"
                value={value}
                onChangeText={onChange}
                secureTextEntry={false}
                errorMessage={errors.otp?.message}
                autoCapitalize="none"
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
