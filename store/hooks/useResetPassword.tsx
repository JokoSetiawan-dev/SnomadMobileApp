// hooks/useRegister.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "expo-router";
import { passwordApiClient } from "@/utils/api/passwordApi";
import {useRecoilValue, useResetRecoilState} from "recoil";
import { emailState } from "../atom/emailAtom";
import { ResetPasswordFormData, resetPasswordSchema } from "@/utils/validationSchemas/resetPasswordSchema";

export function useResetPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const email = useRecoilValue(emailState)
  const resetEmail =  useResetRecoilState(emailState)
  const router = useRouter();
  

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email,
      password: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await passwordApiClient.resetPassword({
        email: data.email.toLowerCase(),
        password: data.password,
      });

      console.log(response.data, "response reset password");

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        resetEmail()
        router.replace("/login");
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
