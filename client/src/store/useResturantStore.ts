import { Orders } from "@/types/orderTypes";
import { MenuItem, RestaurantState } from "@/types/resturantTypes";
import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const API_END_POINT = `${import.meta.env.VITE_API_END_POINT}/resturant`;
axios.defaults.withCredentials = true;

export const useResturantStore = create<RestaurantState>()(
  persist(
    (set, get) => ({
      loading: false,
      resturant: null,
      searchedResturant: null,
      appliedFilter: [],
      singleResturant: null,
      resturantOrders: [],
      createResturant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/create`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
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
          const response = await axios.get(`${API_END_POINT}/all`);
          if (response.data.success) {
            set({ resturant: response.data.resturant });
          }
        } catch (error: unknown) {
          set({ loading: false });
          const err = error as { response?: { data?: { message?: string } } };
          console.log(err.response?.data?.message || "Something went wrong");
        }
      },

      updateResturant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(
            `${API_END_POINT}/update`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, resturant: response.data.resturant });
          }
        } catch (error: unknown) {
          set({ loading: false });
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },

      searchResturant: async (
        searchText: string,
        searchQuery: string,
        selectedTags: string[]
      ) => {
        try {
          set({ loading: true });

          const params = new URLSearchParams();
          if (searchQuery) params.set("searchQuery", searchQuery);
          if (selectedTags.length > 0)
            params.set("selectedTags", selectedTags.join(","));

          await new Promise((resolve) => setTimeout(resolve, 1000));
          const response = await axios.get(
            `${API_END_POINT}/search/${searchText}?${params.toString()}`
          );

          if (response.data.success) {
            set({
              loading: false,
              searchedResturant: { data: response.data.data },
            });
          }
        } catch (error: unknown) {
          set({ loading: false, searchedResturant: null });
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },

      addMenuToResturant: (menu: MenuItem) => {
        set((state: RestaurantState) => ({
          resturant: state.resturant
            ? { ...state.resturant, menus: [...state.resturant.menus, menu] }
            : null,
        }));
      },

      updateMenuToResturant: (updatedMenu: MenuItem) => {
        set((state: RestaurantState) => {
          if (state.resturant) {
            const updatedMenuList = state.resturant.menus.map(
              (menu: MenuItem) =>
                menu._id === updatedMenu._id ? updatedMenu : menu
            );
            return {
              resturant: {
                ...state.resturant,
                menus: updatedMenuList,
              },
            };
          }
          return state;
        });
      },

      setAppliedFilter: (value: string) => {
        set((state: RestaurantState) => {
          const isAlreadyApplied = state.appliedFilter.includes(value);
          const updatedFilter = isAlreadyApplied
            ? state.appliedFilter.filter((item: string) => item !== value)
            : [...state.appliedFilter, value];
          return { appliedFilter: updatedFilter };
        });
      },

      resetAppliedFilter: () => {
        set({ appliedFilter: [] });
      },

      getSingleResturant: async (resturantId: string) => {
        try {
          const response = await axios.get(`${API_END_POINT}/${resturantId}`);
          if (response.data.success) {
            set({ singleResturant: response.data.resturant });
          }
        } catch (error: unknown) {
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },
      getResturantOrders: async () => {
        try {
          const response = await axios.get(`${API_END_POINT}/order`);
          if (response.data.success) {
            set({ resturantOrders: response.data.orders });
          }
        } catch (error: unknown) {
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },
      updateResturantOrder: async (orderId: string, status: string) => {
        try {
          const response = await axios.put(
            `${API_END_POINT}/order/${orderId}/status`,
            { status },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            const updatedOrder = get().resturantOrders.map((order: Orders) => {
              return order._id === orderId
                ? { ...order, status: response.data.status }
                : order;
            });
            set({ resturantOrders: updatedOrder });
            toast.success(response.data.message);
          }
        } catch (error: unknown) {
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
