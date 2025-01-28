// hooks/useAuthCheck.ts
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { tokenCheckSelector } from '@/store/selector/tokenCheckSelector';
import * as SplashScreen from 'expo-splash-screen';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore error */
});

export function useAuthCheck() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const tokenLoadable = useRecoilValueLoadable(tokenCheckSelector);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (tokenLoadable.state === 'hasValue') {
          const hasToken = !!tokenLoadable.contents;
          
          if (!hasToken) {
            await router.replace('/login');
          }
          
          if (!isReady) {
            setIsReady(true);
            await SplashScreen.hideAsync();
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // On error, hide splash screen and let error boundary handle it
        if (!isReady) {
          setIsReady(true);
          await SplashScreen.hideAsync();
        }
      }
    };

    checkAuth();
  }, [tokenLoadable.state, tokenLoadable.contents, isReady]);

  return {
    isReady,
    isLoading: tokenLoadable.state === 'loading'
  };
}