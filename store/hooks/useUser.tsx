import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/atom/authAtom';
import { userApiClient } from '@/utils/api/userApi';

export interface User {
 id: string;
 name: string;
 email: string;
 role: string;
 profilePicture?: string;
 telephone?: string;
}


export const useUser = () => {
    const getUserFromStorage = async (): Promise<User | null> => {
      try {
        const userData = await AsyncStorage.getItem('@user_data');
        return userData ? JSON.parse(userData) : null;
      } catch (error) {
        console.error('Error getting user:', error);
        return null;
      }
    };
   
    const setUserData = async (userData: User) => {
      try {
        await AsyncStorage.setItem('@user_data', JSON.stringify(userData));
      } catch (error) {
        console.error('Error saving user:', error);
        throw error;
      }
    };
   
    const updateUserData = async (newData: Partial<User>) => {
      try {
        const currentUser = await getUserFromStorage();
        if (!currentUser) throw new Error('No user data found');
     
        // Get fresh user data from API
        const response = await userApiClient.getUserById({
          userId: currentUser.id
        });
     
        if ("error" in response) {
          throw new Error(response.error);
        }
     
        if (!response.data?.user) {
          throw new Error('Failed to fetch updated user data');
        }
     
        // Merge API data with new data
        const updatedUser = { 
          ...response.data.user,  // Base data from API
          ...newData             // Override with any new local changes
        };
     
        // Save to AsyncStorage
        await AsyncStorage.setItem('@user_data', JSON.stringify(updatedUser));
        return updatedUser;
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
     };
   
    const clearUserData = async () => {
      try {
        await AsyncStorage.removeItem('@user_data');
      } catch (error) {
        console.error('Error clearing user:', error);
        throw error;
      }
    };
   
    return {
      getUserFromStorage,
      setUserData,
      updateUserData,
      clearUserData
    };
   };