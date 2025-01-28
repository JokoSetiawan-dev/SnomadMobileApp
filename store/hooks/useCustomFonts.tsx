import * as Font from 'expo-font';
import { useCallback, useEffect, useState } from 'react';
import { FontFamily } from '../../constants/font';

export const useCustomFonts = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFonts = useCallback(async () => {
    try {
      await Font.loadAsync({
        [FontFamily.Black]: require('../../assets/fonts/Poppins-Black.ttf'),
        [FontFamily.BlackItalic]: require('../../assets/fonts/Poppins-BlackItalic.ttf'),
        [FontFamily.Bold]: require('../../assets/fonts/Poppins-Bold.ttf'),
        [FontFamily.BoldItalic]: require('../../assets/fonts/Poppins-BoldItalic.ttf'),
        [FontFamily.ExtraBold]: require('../../assets/fonts/Poppins-ExtraBold.ttf'),
        [FontFamily.ExtraBoldItalic]: require('../../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
        [FontFamily.ExtraLight]: require('../../assets/fonts/Poppins-ExtraLight.ttf'),
        [FontFamily.ExtraLightItalic]: require('../../assets/fonts/Poppins-ExtraLightItalic.ttf'),
        [FontFamily.Italic]: require('../../assets/fonts/Poppins-Italic.ttf'),
        [FontFamily.Light]: require('../../assets/fonts/Poppins-Light.ttf'),
        [FontFamily.LightItalic]: require('../../assets/fonts/Poppins-LightItalic.ttf'),
        [FontFamily.Medium]: require('../../assets/fonts/Poppins-Medium.ttf'),
        [FontFamily.MediumItalic]: require('../../assets/fonts/Poppins-MediumItalic.ttf'),
        [FontFamily.Regular]: require('../../assets/fonts/Poppins-Regular.ttf'),
        [FontFamily.SemiBold]: require('../../assets/fonts/Poppins-SemiBold.ttf'),
        [FontFamily.SemiBoldItalic]: require('../../assets/fonts/Poppins-SemiBoldItalic.ttf'),
        [FontFamily.Thin]: require('../../assets/fonts/Poppins-Thin.ttf'),
        [FontFamily.ThinItalic]: require('../../assets/fonts/Poppins-ThinItalic.ttf'),
        [FontFamily.SpaceMono]: require('../../assets/fonts/SpaceMono-Regular.ttf'),
      });
      setLoaded(true);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load fonts');
      console.error('Error loading fonts:', e);
    }
  }, []);

  useEffect(() => {
    loadFonts();
  }, [loadFonts]);

  return { loaded, error };
};