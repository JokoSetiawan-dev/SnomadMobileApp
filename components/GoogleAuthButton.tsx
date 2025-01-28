import React, { useState } from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import * as AuthSession from "expo-auth-session";
import { Href, useRouter } from "expo-router";

interface GoogleAuthButtonProps {
  role?: "buyer" | "seller";
  onSuccess?: (tokens: { accessToken: string; refreshToken: string }) => void;
  onError?: (error: string) => void;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  role = "buyer",
  onSuccess,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Configure your backend URL
  const API_URL =
    "https://e061-2001-448a-1041-88d4-a817-8836-1a98-d657.ngrok-free.app";

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);

      // Generate redirect URI
      const redirectUri = AuthSession.makeRedirectUri();

      // Open Google auth URL from your backend
      const authUrl = `${API_URL}/auth/google?role=${role}`;
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUri
      );
      console.log(result);

      if (result.type === "success" && result.url) {
        // Extract tokens from the URL
        const url = new URL(result.url);
        const accessToken = url.searchParams.get("accessToken");
        const refreshToken = url.searchParams.get("refreshToken");
        console.log(accessToken, refreshToken);

        if (accessToken && refreshToken) {
          // Store tokens securely
          await SecureStore.setItemAsync("accessToken", accessToken);
          await SecureStore.setItemAsync("refreshToken", refreshToken);

          onSuccess?.({ accessToken, refreshToken });
          router.push("/" as Href);
        } else {
          onError?.("Authentication failed: No tokens received");
        }
      } else {
        onError?.("Authentication was cancelled");
      }
    } catch (error) {
      console.error("Google auth error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Authentication failed";
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex flex-row justify-center w-full h-[50px] rounded-full border border-gray-300">
      <TouchableOpacity
        onPress={handleGoogleAuth}
        disabled={isLoading}
        className="flex flex-row justify-center items-center"
      >
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color="#4285F4"
            style={{ marginRight: 12 }}
          />
        ) : (
          <AntDesign
            name="google"
            size={24}
            color="#4285F4"
            style={{ marginRight: 12 }}
          />
        )}
        <Text className="font-poppins-semibold text-center text-[14px]">
          {isLoading ? "Signing in..." : "Continue with Google"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleAuthButton;
