// hooks/useRegister.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import * as SecureStore from "expo-secure-store";
import {
  loginSchema,
  type LoginFormData,
} from "../../utils/validationSchemas/loginSchema";
import { authApiClient } from "../../utils/api/authApi";
import { User, userState } from "../atom/authAtom";
import { Href, useRouter } from "expo-router";
import { useUser } from "./useUser";
import { useToken } from "./useToken";
import { tokenCheckSelector } from "../selector/tokenCheckSelector";

export function useLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUserData } = useUser();

  const { saveToken } = useToken();

  const refreshTokenState = useRecoilCallback(({ refresh }) => () => {
    refresh(tokenCheckSelector);
  });

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await authApiClient.login({
        email: data.email.toLowerCase(),
        password: data.password,
      });


      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        console.log("login response", response.data.user);
        
        const token = response.data.accessToken;
        saveToken(token);
        setUserData(response.data.user);
        refreshTokenState();
        form.reset();
        router.replace("/");
        return;
      }
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
