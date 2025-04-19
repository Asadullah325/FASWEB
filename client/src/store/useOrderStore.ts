import { CheckoutSessionRequest, OrderState } from "@/types/orderTypes";
import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT = `${import.meta.env.VITE_API_END_POINT}/order`;
axios.defaults.withCredentials = true;

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      loading: false,
      orders: [],
      createCheckoutSession: async (
        checkoutSession: CheckoutSessionRequest
      ) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/create-checkout-session`,
            checkoutSession,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          window.location.href = response.data.session.url;
          set({ loading: false });
        } catch (error: unknown) {
          set({ loading: false });
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },
      getOrderDetails: async () => {
        try {
          set({ loading: true });
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/`);
          set({ loading: false, orders: response.data.orders });
        } catch (error: unknown) {
          set({ loading: false });
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      },
    }),
    {
      name: "order",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
