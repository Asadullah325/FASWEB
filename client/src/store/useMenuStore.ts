import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useResturantStore } from "./useResturantStore";

const API_END_POINT = `${import.meta.env.VITE_API_END_POINT}/menu`;
axios.defaults.withCredentials = true;

type MenuState = {
  loading: boolean;
  menu: null;
  createMenu: (formData: FormData) => Promise<void>;
  editMenu: (menuId: string, formData: FormData) => Promise<void>;
};

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      loading: false,
      menu: null,
      createMenu: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/add`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.menu });
          }

          useResturantStore.getState().addMenuToResturant(response.data.menu);
        } catch (error: unknown) {
          set({ loading: false });
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },
      editMenu: async (menuId: string, formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(
            `${API_END_POINT}/edit/${menuId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.menu });
          }
          useResturantStore.getState().updateMenuToResturant(response.data.menu);
        } catch (error: unknown) {
          set({ loading: false });
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },
    }),
    {
      name: "menu",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
