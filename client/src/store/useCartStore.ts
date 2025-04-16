import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CartState = {
  count: number;
  increment: () => void;
};

export const useCartStore = create<CartState>()(
  persist<CartState>(
    (set) => ({
      count: 0,
      increment: () => {
        set((state) => ({ count: state.count + 1 }));
      },
    }),
    {
      name: "cart-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
