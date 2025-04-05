import { create } from "zustand";
import { Restaurant, Station } from "@/types";
import { restaurants } from "@/mocks/restaurants";
import { stations } from "@/mocks/stations";

interface SearchState {
  searchQuery: string;
  searchResults: Restaurant[];
  stationResults: Station[];
  selectedStation: Station | null;
  selectedCuisine: string | null;
  isLoading: boolean;

  // Actions
  setSearchQuery: (query: string) => void;
  searchRestaurants: () => void;
  searchStations: () => void;
  selectStation: (station: Station | null) => void;
  selectCuisine: (cuisine: string | null) => void;
  clearSearch: () => void;

  // Filters
  filterByDistance: (maxDistance: number) => void;
  filterByRating: (minRating: number) => void;
  filterByPrice: (minPrice: number, maxPrice: number) => void;
}

export const useSearchStore = create<SearchState>()((set, get) => ({
  searchQuery: "",
  searchResults: [],
  stationResults: [],
  selectedStation: null,
  selectedCuisine: null,
  isLoading: false,

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  searchRestaurants: () => {
    const { searchQuery, selectedCuisine } = get();
    set({ isLoading: true });

    // Simulate API call
    setTimeout(() => {
      let results = [...restaurants];

      // Filter by search query
      if (searchQuery) {
        results = results.filter(
          (restaurant) =>
            restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            restaurant.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            restaurant.tags.some((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
      }

      // Filter by cuisine
      if (selectedCuisine) {
        results = results.filter(
          (restaurant) =>
            restaurant.cuisine.toLowerCase() === selectedCuisine.toLowerCase()
        );
      }

      set({ searchResults: results, isLoading: false });
    }, 500);
  },

  searchStations: () => {
    const { searchQuery } = get();
    set({ isLoading: true });

    // Simulate API call
    setTimeout(() => {
      let results = [...stations];

      // Filter by search query
      if (searchQuery) {
        results = results.filter((station) =>
          station.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      set({ stationResults: results, isLoading: false });
    }, 500);
  },

  selectStation: (station: Station | null) => {
    set({ selectedStation: station });

    if (station) {
      // Find restaurants near this station
      const nearbyRestaurants = restaurants.filter((restaurant) => {
        // Simple distance calculation (not accurate for large distances)
        const lat1 = station.coordinates.latitude;
        const lon1 = station.coordinates.longitude;
        const lat2 = restaurant.coordinates.latitude;
        const lon2 = restaurant.coordinates.longitude;

        const R = 6371; // Radius of the earth in km
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km

        return d <= 3; // Within 3km of the station
      });

      set({ searchResults: nearbyRestaurants });
    }
  },

  selectCuisine: (cuisine: string | null) => {
    set({ selectedCuisine: cuisine });
    get().searchRestaurants();
  },

  clearSearch: () => {
    set({
      searchQuery: "",
      searchResults: [],
      stationResults: [],
      selectedStation: null,
      selectedCuisine: null,
    });
  },

  filterByDistance: (maxDistance: number) => {
    const { selectedStation } = get();

    if (!selectedStation) return;

    const filteredResults = restaurants.filter((restaurant) => {
      // Simple distance calculation (not accurate for large distances)
      const lat1 = selectedStation.coordinates.latitude;
      const lon1 = selectedStation.coordinates.longitude;
      const lat2 = restaurant.coordinates.latitude;
      const lon2 = restaurant.coordinates.longitude;

      const R = 6371; // Radius of the earth in km
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distance in km

      return d <= maxDistance;
    });

    set({ searchResults: filteredResults });
  },

  filterByRating: (minRating: number) => {
    const { searchResults } = get();
    const filteredResults = searchResults.filter(
      (restaurant) => restaurant.rating >= minRating
    );
    set({ searchResults: filteredResults });
  },

  filterByPrice: (minPrice: number, maxPrice: number) => {
    const { searchResults } = get();
    const filteredResults = searchResults.filter(
      (restaurant) =>
        restaurant.priceLevel >= minPrice && restaurant.priceLevel <= maxPrice
    );
    set({ searchResults: filteredResults });
  },
}));
