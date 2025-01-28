// hooks/useChangePassword.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "expo-router";
import { passwordApiClient } from "@/utils/api/passwordApi";
import { ChangePasswordFormData, changePasswordSchema } from "@/utils/validationSchemas/changePasswordSchema";
import { useUser } from "@/store/hooks/useUser";
import { useLogout } from "./useLogout";

export function useChangePassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { getUserFromStorage } = useUser();
  const {logout} = useLogout();

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: async () => {
      try {
        const user = await getUserFromStorage();
        
        if (!user?.id) {
          throw new Error('User not found in storage');
        }

        return {
          userId: user.id,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        };
      } catch (error) {
        console.error('Error getting user from storage:', {
          error,
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        });
        router.replace("/login");
        return {
          userId: '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        };
      }
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const user = await getUserFromStorage();
      if (!user?.id) {
        throw new Error('User ID not found in storage');
      }

      // Validate password match
      if (data.newPassword !== data.confirmPassword) {
        throw new Error('New password and confirmation do not match');
      }

      const response = await passwordApiClient.changePassword({
        userId: data.userId,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      console.log('Server Response:', response);

      if (response.error) {
        throw new Error(`API Error: ${response.error}`);
      }

      if (response.data) {
        await logout();
        form.reset();
        router.replace("/login");
        return response.data;
      }

      throw new Error('Failed to change password');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Password Change Failed:', {
        error,
        message: errorMessage,
        stack: error instanceof Error ? error.stack : undefined
      });
      setError(errorMessage);
      throw error;
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