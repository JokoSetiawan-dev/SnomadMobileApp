import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { userApiClient } from '@/utils/api/userApi';
import { useUser } from '@/store/hooks/useUser';
import axios from 'axios';
import { Platform } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { userState } from '../atom/authAtom';

export const useProfilePicture = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateUserData, getUserFromStorage } = useUser();
  const setUser = useSetRecoilState(userState)

  const pickAndUploadImage = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        throw new Error('Permission to access gallery was denied');
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
      });

      if (result.canceled) {
        setIsLoading(false);
        return;
      }

      const asset = result.assets[0];
      const userData = await getUserFromStorage();
      if (!userData?.id) {
        throw new Error('User ID not found in storage');
      }

      const formData = new FormData();
      const fileExtension = asset.uri.split('.').pop();
      const fileName = `profile-image.${fileExtension}`;

      formData.append('userId', userData.id);
      formData.append('profileImage', {
        uri: Platform.OS === 'android' ? asset.uri : asset.uri.replace('file://', ''),
        type: asset.mimeType || 'image/jpeg',
        name: fileName,
      } as any);

      const response = await userApiClient.changeProfilePicture({
        userId: userData.id,
        profilePicture: formData,
      });

      console.log('Server Response:', response);

      if (response.error) {
        throw new Error(`API Error: ${response.error}`);
      }

      if (response.data) {
        // Get fresh user data after profile picture update
        const refreshUserResponse = await userApiClient.getUserById({
          userId: userData.id,
        });

        if (refreshUserResponse.error) {
          throw new Error(`Failed to refresh user data: ${refreshUserResponse.error}`);
        }

        if (refreshUserResponse.data?.user) {
          await updateUserData(refreshUserResponse.data.user);
          setUser(refreshUserResponse.data.user);
          return refreshUserResponse.data.user;
        }
      }

      throw new Error('Failed to update profile picture');

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Profile Picture Update Failed:', {
        error,
        message: errorMessage,
        stack: error instanceof Error ? error.stack : undefined
      });
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    pickAndUploadImage,
    isLoading,
    error,
  };
};