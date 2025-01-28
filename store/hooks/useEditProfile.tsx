import { userApiClient } from "@/utils/api/userApi";
import { EditProfileFormData, editProfileSchema } from "@/utils/validationSchemas/editProfileSchema";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecoilState, useResetRecoilState } from "recoil";
import { userState } from "../atom/authAtom";

export function useEditProfile() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { getUserFromStorage, updateUserData } = useUser();
  const params = useLocalSearchParams();
  const [userData] = useRecoilState(userState)
  const resetUser = useResetRecoilState(userState);
 
  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: async () => {
      return {
        userId: userData?.id || '',
        name: userData?.name || '',
        telephone: userData?.telephone?.toString() || '' ,
      };
    },
  });
 
  useEffect(() => {
    const initializeForm = async () => {
      try {
        if (userData) {
          form.reset({
            userId: userData.id,
            name: userData.name,
            telephone: userData.telephone,
          });
        }
      } catch (error) {
        console.error("Error initializing form:", error);
      }
    };
 
    initializeForm();
  }, [params.timestamp]);
 
  const handleSubmit = async (data: EditProfileFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
 
      const response = await userApiClient.editProfile({
        userId: data.userId,
        name: data.name,
        telephone: data.telephone,
      });
 
      if ("error" in response) {
        throw new Error(response.error);
      }

      if (response.data) {
        const userData = await getUserFromStorage();
        if (!userData?.id) {
          throw new Error('User ID not found in storage');
        }
        // Get fresh user data after profile picture update
        const refreshUserResponse = await userApiClient.getUserById({
          userId: userData.id,
        });

        if (refreshUserResponse.error) {
          throw new Error(`Failed to refresh user data: ${refreshUserResponse.error}`);
        }

        if (refreshUserResponse.data?.user) {
          await updateUserData(refreshUserResponse.data.user);
          router.push({
            pathname: "/profile",
            params: { timestamp: Date.now() }
          });
          resetUser()
          return refreshUserResponse.data.user;
        }
      }
 
 
      throw new Error("Invalid response format");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      console.error("Edit profile error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
 
  return {
    form,
    isSubmitting,
    error,
    onSubmit: form.handleSubmit(handleSubmit),
  };
 }

