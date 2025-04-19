import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { UserLogin, UserSignUp } from "@/schemas/userSchema";
import { toast } from "react-toastify";

const API_END_POINT = `${import.meta.env.VITE_API_END_POINT}/user`;
axios.defaults.withCredentials = true;


type User = {
  name: string;
  email: string;
  profilePicture: string;
  contact: number;
  address: string;
  country: string;
  city: string;
  isAdmin: boolean;
  isVerified: boolean;
};

type UpdateProfileData = Partial<Omit<User, "isAdmin" | "isVerified">>;

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  token: string | null;
  loading: boolean;
  signup: (data: UserSignUp) => Promise<void>;
  login: (data: UserLogin) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
  checkAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (
    data: UpdateProfileData,
    formData?: FormData
  ) => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      token: null,
      loading: false,
      signup: async (data: UserSignUp) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/signup`, data, {
            headers: { "Content-Type": "application/json" },
          });
          if (response?.data?.success) {
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              token: response.data.token,
              isAuthenticated: true,
            });
            window.location.href = "/verfiy-email";
          }
        } catch (error: unknown) {
          set({ loading: false });
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },
      login: async (data: UserLogin) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/login`, data, {
            headers: { "Content-Type": "application/json" },
          });
          if (response?.data?.success) {
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              token: response.data.token,
              isAuthenticated: true,
            });
          }
        } catch (error: unknown) {
          set({ loading: false });
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },
      verifyEmail: async (verificationCode: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/verify-email`,
            { verificationCode },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          if (response?.data?.success) {
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: unknown) {
          set({ loading: false });
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },
      checkAuthentication: async () => {
        try {
          set({ loading: true, isCheckingAuth: true });
          const response = await axios.get(`${API_END_POINT}/check-auth`);
          if (response?.data?.success) {
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
              isCheckingAuth: false,
            });
          }
        } catch (error: unknown) {
          set({
            loading: false,
            isCheckingAuth: false,
            isAuthenticated: false,
          });
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },
      logout: async () => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/logout`);
          if (response?.data?.success) {
            toast.success(response.data.message);
            set({
              loading: false,
              user: null,
              token: null,
              isAuthenticated: false,
            });
          }
        } catch (error: unknown) {
          set({ loading: false });
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },
      forgotPassword: async (email: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/forgot-password`,
            { email },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          if (response?.data?.success) {
            toast.success(response.data.message);
          }
          set({ loading: false });
        } catch (error: unknown) {
          set({ loading: false });
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },
      resetPassword: async (token: string, newPassword: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/reset-password/${token}`,
            { newPassword },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          if (response?.data?.success) {
            toast.success(response.data.message);
          }
          set({ loading: false });
        } catch (error: unknown) {
          set({ loading: false });
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },
      updateProfile: async (data: UpdateProfileData, formData?: FormData) => {
        try {
          let response;

          if (formData) {
            // If we have form data (includes file), send as multipart
            response = await axios.put(
              `${API_END_POINT}/profile/update`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          } else {
            // Otherwise send as JSON
            response = await axios.put(
              `${API_END_POINT}/profile/update`,
              data,
              {
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          if (response?.data?.success) {
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: unknown) {
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
