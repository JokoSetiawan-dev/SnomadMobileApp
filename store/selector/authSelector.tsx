import { selector, useRecoilState, useRecoilValue } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userState, User } from '../atom/authAtom';

const USER_STORAGE_KEY = '@user_data';

// Selector that handles syncing between Recoil state and AsyncStorage
export const userPersistenceSelector = selector<User | null>({
    key: 'userPersistenceSelector',
    get: async ({ get }) => {
        const currentUser = get(userState);
        if (currentUser) return currentUser;

        try {
            const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error('Error reading user from AsyncStorage:', error);
            return null;
        }
    },
    set: ({ set }, newValue) => {
        set(userState, newValue);
        if (newValue) {
            AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newValue))
                .catch(error => console.error('Error saving user to AsyncStorage:', error));
        } else {
            AsyncStorage.removeItem(USER_STORAGE_KEY)
                .catch(error => console.error('Error removing user from AsyncStorage:', error));
        }
    }
});