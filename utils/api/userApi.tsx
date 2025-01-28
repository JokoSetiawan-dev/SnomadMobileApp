
import axios, { AxiosResponse } from "axios";
import { useToken } from "@/store/hooks/useToken";
import * as SecureStore from "expo-secure-store"
import { User } from "@/store/atom/authAtom";
import axiosInstance from "./axiosInstance";

const API_URL =
  "https://0690-2001-448a-1041-b140-4946-36c2-ce20-5bc3.ngrok-free.app/user";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export class userApiClient {
  static logout() {
      throw new Error("Method not implemented.");
  }
  static async editProfile(data: {
    userId: string;
    name: string;
    telephone: string;
  }): Promise<ApiResponse<{ message: string; user: any }>> {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      console.log("token on api expo",token)
      const response: AxiosResponse<{ message: string; user: any }> =
        await axiosInstance.patch(`${API_URL}/profile/edit`, data, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
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

  static async changeProfilePicture(data: {
    userId: string;
    profilePicture: FormData;
  }): Promise<ApiResponse<{ data: { url: string; }; message: string; }>> {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      
      if (!token) {
        throw new Error('No access token found');
      }

      const response = await axiosInstance.patch(
        `${API_URL}/profile/picture`,
        data.profilePicture,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          },
          timeout: 60000,
        }
      );

      console.log('API Response:', response.data);
      return { data: response.data };

    } catch (error: any) {
      console.error('API Client Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });

      return {
        error: error.response?.data?.message || error.message || "An error occurred",
      };
    }
  }

  static async getUserById(data: {
    userId: string;
  }): Promise<ApiResponse<{ message: string; user: any; }>> {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      
      if (!token) {
        throw new Error('No access token found');
      }

      const response: AxiosResponse<{ message: string; user: any }> =
      await axios.post(`${API_URL}/profile`, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      console.log('Get User Response:', response.data);
      return { data: response.data };

    } catch (error: any) {
      console.error('Get User Error:', error);
      return {
        error: error.response?.data?.message || error.message || "An error occurred",
      };
    }
  }
}
