// store/selector/tokenCheckSelector.ts
import { selector } from "recoil";
import * as SecureStore from "expo-secure-store"

export const tokenCheckSelector = selector<string | null>({
    key: "tokenCheckSelector",
    get: async ({ get }) => {
        try {
            const token = await SecureStore.getItemAsync("accessToken");
            return token;
        } catch (error) {
            console.error('Error fetching token:', error);
            return null;
        }
    }
});