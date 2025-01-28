import axios, { AxiosResponse } from "axios";
import * as SecureStore from "expo-secure-store"
import axiosInstance from "./axiosInstance";

const API_URL = "https://0690-2001-448a-1041-b140-4946-36c2-ce20-5bc3.ngrok-free.app/auth/password";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export class passwordApiClient {
    static async requestReset(data: {
      email: string;
    }): Promise<ApiResponse<{ data: string }>> {
      try {
        const response: AxiosResponse<{ data: string }> = await axios.post(`${API_URL}/request-reset`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        return { data: response.data };
      } catch (error: any) {
        return {
          error: error.response?.data?.message || error.message || "An error occurred",
        };
      }
    }

    static async validateOtp(data: {
      email: string;
      otp: string;
    }): Promise<ApiResponse<{ email: string }>> {
      try {
        const response: AxiosResponse<{ email:string }> = await axios.post(`${API_URL}/otp-validation`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        return { data: response.data };
      } catch (error: any) {
        return {
          error: error.response?.data?.message || error.message || "An error occurred",
        };
      }
    }

    static async resetPassword(data: {
      email: string;
      password: string;
    }): Promise<ApiResponse<{ message: string }>> {
      try {
        const response: AxiosResponse<{ message:string }> = await axios.post(`${API_URL}/reset-password`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data, "response on api");
        
        return { data: response.data };
      } catch (error: any) {
        return {
          error: error.response?.data?.message || error.message || "An error occurred",
        };
      }
    }

    static async changePassword(data: {
      userId: string,
      currentPassword: string;
      newPassword: string;
    }): Promise<ApiResponse<{ message: string}>> {
      try {
        const token = await SecureStore.getItemAsync("accessToken");
        console.log("token on api change password",token)
        const response: AxiosResponse<{ message: string}> =
          await axios.post(`${API_URL}/change-password`, data, {
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
    
  }