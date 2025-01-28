// hooks/useLogout.ts
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useUser } from '@/store/hooks/useUser';
import { useToken } from '@/store/hooks/useToken';
import { authApiClient } from '@/utils/api/authApi';

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { clearUserData } = useUser();
  const { removeToken } = useToken();

  const logout = async () => {
    setIsLoading(true);
    try {
      // Call logout API
      const response = await authApiClient.logout();
      
      if (response.error) {
        throw new Error(response.error);
      }

      // Clear local token
      await removeToken();

      // Clear user data from store
      await clearUserData();

      // Navigate to login
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // You might want to show an error toast here
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading };
};