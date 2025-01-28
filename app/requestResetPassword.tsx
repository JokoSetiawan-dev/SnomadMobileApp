// screens/Register.tsx
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomTextInput";
import SubmitButton from "@/components/SubmitButton";
import { Link } from "expo-router";
import { useRequestResetPassword } from "@/store/hooks/useRequestResetPassword";

export default function RequestResetPassword() {
  const { form, isSubmitting, error, onSubmit } = useRequestResetPassword();
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <SafeAreaView className="h-full">
      <View className="flex-1 bg-white p-[30px]">
        <View className="flex mb-[35px] mt-[30px]">
          <Text
            className=" font-poppins-bold text-[40px] leading-none"
            style={{ lineHeight: 45 }}
          >
            Request
          </Text>
          <Text
            className=" font-poppins-bold text-[40px] leading-none"
            style={{ color: "#E25822", lineHeight: 45 }}
          >
            reset
          </Text>
        </View>
        <Text className=" font-poppins-light text-[12px] mb-[35px]">
        Please enter your registered email. Ensure the email is valid and associated with your account. 
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

          {/* Submit Button */}
          <View className="mt-[15px]">
            <View className="w-full flex justify-center gap-[35px]">
              <SubmitButton
                onPress={onSubmit}
                isSubmitting={isSubmitting}
                buttonText="Reset passowrd"
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
