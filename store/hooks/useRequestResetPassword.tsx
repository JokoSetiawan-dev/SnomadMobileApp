// hooks/useRegister.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "expo-router";
import { RequestResetPasswordFormData, requestResetPasswordSchema } from "@/utils/validationSchemas/requestResetPasswordSchema";
import { passwordApiClient } from "@/utils/api/passwordApi";
import { useSetRecoilState } from "recoil";
import { emailState } from "../atom/emailAtom";

export function useRequestResetPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setEmail = useSetRecoilState(emailState);
  const router = useRouter()

  const form = useForm<RequestResetPasswordFormData>({
    resolver: zodResolver(requestResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: RequestResetPasswordFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await passwordApiClient.requestReset({
        email: data.email.toLowerCase()
      });

      console.log(response.data, "response of request reset password");
      

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        setEmail(response.data.data);
        console.log(response.data.data, "email to set atom");
        
        router.replace("/validateOtp")
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