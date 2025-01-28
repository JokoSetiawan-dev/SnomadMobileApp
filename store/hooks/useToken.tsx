import * as SecureStore from "expo-secure-store";

const TOKEN_KEYS = {
  ACCESS: "accessToken",
} as const;

interface UseTokenReturn {
  getToken: () => Promise<string | null>;
  saveToken: (token: string) => Promise<void>;
  removeToken: () => Promise<void>;
  isTokenValid: () => Promise<boolean>;
}

export const useToken = (): UseTokenReturn => {
  const saveToken = async (token: string): Promise<void> => {
    try {
      // Make sure we're storing just the token string
      if (typeof token === 'object') {
        console.error('Invalid token format:', token);
        throw new Error('Invalid token format');
      }
      await SecureStore.setItemAsync(TOKEN_KEYS.ACCESS, token);
    } catch (error) {
      console.error("Error saving token:", error);
      throw new Error("Failed to save authentication token");
    }
  };

  const getToken = async (): Promise<string | null> => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEYS.ACCESS);
      if (!token) return null;
      
      // Handle case where token might be stored as object
      try {
        const parsedToken = JSON.parse(token);
        if (typeof parsedToken === 'object') {
          console.error('Token stored in invalid format:', parsedToken);
          await removeToken(); // Clear invalid token
          return null;
        }
      } catch {
        // If JSON.parse fails, token is already a string which is what we want
        return token;
      }
      
      return token;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  };

  const removeToken = async (): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEYS.ACCESS);
    } catch (error) {
      console.error("Error removing token:", error);
      throw new Error("Failed to remove authentication token");
    }
  };

  const isTokenValid = async (): Promise<boolean> => {
    try {
      const token = await getToken();
      return !!token;
    } catch {
      return false;
    }
  };

  return {
    getToken,
    saveToken,
    removeToken,
    isTokenValid,
  };
};