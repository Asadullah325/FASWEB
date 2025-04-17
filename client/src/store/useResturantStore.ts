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
      searchedResturant: null,

      createResturant: async (formData: any) => {
        try {
          set({ loading: true });
          const { data } = await axios.post(
            `${API_END_POINT}/create`,
            formData
          );
          if (data?.success) {
            toast.success(data.message);
            set({ loading: false });
          }
        } catch (error: unknown) {
          set({ loading: false });
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },

      getResturant: async () => {
        try {
          set({ loading: true });
          const { data } = await axios.get(`${API_END_POINT}/all`);
          if (data?.success) {
            toast.success(data.message);
            set({ resturant: data.resturant });
            set({ loading: false });
          }
        } catch (error: unknown) {
          set({ loading: false });
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },

      updateResturant: async (formData: any) => {
        try {
          set({ loading: true });
          const { data } = await axios.put(`${API_END_POINT}/update`, formData);
          if (data?.success) {
            toast.success(data.message);
            set({ loading: false });
          }
        } catch (error: unknown) {
          set({ loading: false });
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },

      searchResturant: async (
        searchTerm: string,
        searchQuery: string,
        selectedTags: string
      ) => {
        try {
          set({ loading: true });
          const params = new URLSearchParams({
            searchQuery,
            selectedTags,
          });

          const { data } = await axios.get(
            `${API_END_POINT}/search/${searchTerm}?${params.toString()}`
          );

          if (data?.success) {
            toast.success(data.message);
            set({ searchedResturant: data.resturants });
            set({ loading: false });
          }
        } catch (error: unknown) {
          set({ loading: false });
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
