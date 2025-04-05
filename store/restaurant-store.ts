import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Restaurant } from "@/types";
import { getRestaurantById } from "@/mocks/restaurants";

interface RestaurantState {
  savedRestaurants: string[];
  recentlyViewed: string[];
  isLoading: boolean;
  error: string | null;

  // Actions
  saveRestaurant: (restaurantId: string) => void;
  unsaveRestaurant: (restaurantId: string) => void;
  addToRecentlyViewed: (restaurantId: string) => void;
  clearRecentlyViewed: () => void;

  // Selectors
  getSavedRestaurants: () => Restaurant[];
  getRecentlyViewedRestaurants: () => Restaurant[];
  isSaved: (restaurantId: string) => boolean;
}

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set, get) => ({
      savedRestaurants: [],
      recentlyViewed: [],
      isLoading: false,
      error: null,

      saveRestaurant: (restaurantId: string) => {
        const { savedRestaurants } = get();
        if (!savedRestaurants.includes(restaurantId)) {
          set({ savedRestaurants: [...savedRestaurants, restaurantId] });
        }
      },

      unsaveRestaurant: (restaurantId: string) => {
        const { savedRestaurants } = get();
        set({
          savedRestaurants: savedRestaurants.filter(
            (id) => id !== restaurantId
          ),
        });
      },

      addToRecentlyViewed: (restaurantId: string) => {
        const { recentlyViewed } = get();
        // Remove if already exists to avoid duplicates
        const filtered = recentlyViewed.filter((id) => id !== restaurantId);
        // Add to beginning of array (most recent first)
        set({
          recentlyViewed: [restaurantId, ...filtered].slice(0, 10), // Keep only 10 most recent
        });
      },

      clearRecentlyViewed: () => {
        set({ recentlyViewed: [] });
      },

      getSavedRestaurants: () => {
        const { savedRestaurants } = get();
        return savedRestaurants
          .map((id) => getRestaurantById(id))
          .filter(
            (restaurant): restaurant is Restaurant => restaurant !== undefined
          );
      },

      getRecentlyViewedRestaurants: () => {
        const { recentlyViewed } = get();
        return recentlyViewed
          .map((id) => getRestaurantById(id))
          .filter(
            (restaurant): restaurant is Restaurant => restaurant !== undefined
          );
      },

      isSaved: (restaurantId: string) => {
        return get().savedRestaurants.includes(restaurantId);
      },
    }),
    {
      name: "restaurant-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
