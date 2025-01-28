// hooks/useRegister.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "expo-router";
import { passwordApiClient } from "@/utils/api/passwordApi";
import {useRecoilValue} from "recoil";
import {
  ValidateOtpFormData,
  validateOtpSchema,
} from "@/utils/validationSchemas/validateOtpScheme";
import { emailState } from "../atom/emailAtom";

export function useValidateOtp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const email = useRecoilValue(emailState)
  const router = useRouter();

  const form = useForm<ValidateOtpFormData>({
    resolver: zodResolver(validateOtpSchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  const onSubmit = async (data: ValidateOtpFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await passwordApiClient.validateOtp({
        email: data.email.toLowerCase(),
        otp: data.otp,
      });

      console.log(response.data);

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        router.replace("/resetPassword");
      }

      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    error,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
