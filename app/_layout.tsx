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

export default function RootLayout() {
  return (
    <RecoilRoot>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </RecoilRoot>
  );
}
