import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const API_END_POINT = "http://localhost:3000/api/v1/resturant";
axios.defaults.withCredentials = true;

export const useResturantStore = create<any>()(
  persist(
    (set) => ({
      loading: false,
      resturant: null,
      createResturant: async (data: any) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/create`, data, {
            headers: { "Content-Type": "application/json" },
          });
          if (response?.data?.success) {
            toast.success(response.data.message);
            set({
              loading: false,
            });
          }
        } catch (error) {
          set({ loading: false });
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },
      getResturant: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/all`);
          if (response?.data?.success) {
            toast.success(response.data.message);
            set({
              loading: false,
              resturant: response.data.newResturant,
            });
          }
        } catch (error) {
          set({ loading: false, resturant: null });
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },
    }),
    {
      name: "resturant",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
