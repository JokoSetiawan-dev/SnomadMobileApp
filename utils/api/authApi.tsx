// utils/api.ts
import axios, { AxiosResponse } from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL =
  "https://0690-2001-448a-1041-b140-4946-36c2-ce20-5bc3.ngrok-free.app/auth";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface LogoutResponse {
  message: string;
}

export class authApiClient {
  static async register(data: {
    name: string;
    email: string;
    role: string;
    password: string;
  }): Promise<ApiResponse<{ token: string; user: any }>> {
    try {
      const response: AxiosResponse<{ token: string; user: any }> =
        await axios.post(`${API_URL}/register`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

      return { data: response.data };
    } catch (error: any) {
      return {
        error:
          error.response?.data?.message || error.message || "An error occurred",
      };
    }
  }

  static async login(data: {
    email: string;
    password: string;
  }): Promise<ApiResponse<{ accessToken: string; user: any }>> {
    try {
      const response: AxiosResponse<{ accessToken: string; user: any }> =
        await axios.post(`${API_URL}/login`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

      return { data: response.data };
    } catch (error: any) {
      return {
        error:
          error.response?.data?.message || error.message || "An error occurred",
      };
    }
  }
  static async logout(): Promise<ApiResponse<LogoutResponse>> {
    try {
      const response: AxiosResponse<LogoutResponse> = await axios.post(
        `${API_URL}/logout`,
        { message: "User logged out" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return { data: response.data };
    } catch (error: any) {
      return {
        error:
          error.response?.data?.message || error.message || "An error occurred",
      };
    }
  }
}
