import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      addItem: (dish) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === dish.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === dish.id ? { ...item, qty: item.qty + 1 } : item
              ),
            };
          }
          return { cart: [...state.cart, { ...dish, qty: 1 }] };
        }),
      removeItem: (id) =>
        set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "addis-eats-cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);