// Zustand's `create` is used to create a store (state + actions)
// `persist` middleware allows the store to save to localStorage (or sessionStorage) so data is not lost on refresh
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./sanity.types";

// Represents a single cart item: a product + how many of it
export interface CartItem {
  product: Product;
  quantity: number;
};

// This interface defines the shape of our store's state and actions
interface StoreState {
  // CART STATE
  items: CartItem[]; // All items in cart
  addItem: (product: Product) => void; // Add a product to cart (or increase qty if it already exists)
  removeItem: (productId: string) => void; // Decrease quantity of a product by 1 (or remove it if qty = 1)
  deleteCartProduct: (productId: string) => void; // Completely remove product from cart
  resetCart: () => void; // Empty the entire cart
  getTotalPrice: () => number; // Calculate total price (without discount logic here)
  getSubTotalPrice: () => number; // Calculate subtotal price (with discount logic)
  getItemCount: (productId: string) => number; // Get quantity of a specific product
  getGroupedItems: () => CartItem[]; // Return items array (used to group by product, if needed)

  // FAVORITES STATE
  favoriteProduct: Product[]; // List of products the user has favorited
  addToFavorite: (product: Product) => Promise<void>; // Toggle product in favorites
  removeFromFavorite: (productId: string) => void; // Remove from favorites
  resetFavorite: () => void; // Clear favorites
};

// Create the Zustand store
const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      favoriteProduct: [],

      // --- CART LOGIC ---

      addItem: (product) =>
        set((state) => {
          // Check if product is already in the cart
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );

          if (existingItem) {
            // If product already exists → increase quantity
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            // If product doesn't exist → add as new with quantity 1
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),

      removeItem: (productId) =>
        set((state) => ({
          // Reduce quantity by 1, remove completely if quantity = 1
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as CartItem[]),
        })),

      deleteCartProduct: (productId) =>
        set((state) => ({
          // Remove product regardless of quantity
          items: state.items.filter(
            ({ product }) => product?._id !== productId
          ),
        })),

      resetCart: () => set({ items: [] }), // Clear the whole cart

      // Calculate total price (without discount handling here)
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        );
      },

      // Calculate subtotal
      getSubTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = ((item.product.discount ?? 0) * price) / 100;
          const discountedPrice = price + discount; // Apply discount
          return total + discountedPrice * item.quantity;
        }, 0);
      },

      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },

      getGroupedItems: () => get().items,

      // --- FAVORITES LOGIC ---

      addToFavorite: (product: Product) => {
        return new Promise<void>((resolve) => {
          set((state: StoreState) => {
            const isFavorite = state.favoriteProduct.some(
              (item) => item._id === product._id
            );
            return {
              favoriteProduct: isFavorite
                ? // If already favorite → remove it
                  state.favoriteProduct.filter(
                    (item) => item._id !== product._id
                  )
                : // If not favorite → add it
                  [...state.favoriteProduct, { ...product }],
            };
          });
          resolve();
        });
      },

      removeFromFavorite: (productId: string) => {
        set((state: StoreState) => ({
          favoriteProduct: state.favoriteProduct.filter(
            (item) => item?._id !== productId
          ),
        }));
      },

      resetFavorite: () => {
        set({ favoriteProduct: [] });
      },
    }),
    {
      name: "cart-store", // This is the localStorage key name
    }
  )
);

export default useStore;
