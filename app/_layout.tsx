import { Stack } from "expo-router";
import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import "../global.css";
import { useCustomFonts } from '../store/hooks/useCustomFonts';
import { Text, View } from "react-native";
import { Image } from 'expo-image';


export default function RootLayout() {
  const { loaded, error} = useCustomFonts();
  const loadGif = require("../assets/images/Infinity@1x-1.0s-200px-200px.gif"); // Use require for local images

  if (!loaded && !error ) {
    return (
      <View className="flex-1 items-center justify-center">
        <Image
          source={loadGif}
          style={{ width: 100, height: 100 }}
        />
      </View>
    );
  }


  return (
    <RecoilRoot>
      <Stack >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{headerShown: false}} />
        <Stack.Screen name="login" options={{headerShown: false}} />
        <Stack.Screen name="requestResetPassword" options={{headerShown: false}} />
        <Stack.Screen name="validateOtp" options={{headerShown: false}} />
        <Stack.Screen name="resetPassword" options={{headerShown: false}} />
        <Stack.Screen name="editProfile" options={{headerShown: false}} />
        <Stack.Screen name="changePassword" options={{headerShown: false}} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </RecoilRoot>
  );
}
