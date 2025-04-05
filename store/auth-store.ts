import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/types";
import { users } from "@/mocks/users";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Find user with matching email (in a real app, would check password too)
          const user = users.find(
            (u) => u.email.toLowerCase() === email.toLowerCase()
          );

          if (user) {
            set({ user, isAuthenticated: true, isLoading: false });
          } else {
            set({ error: "Invalid email or password", isLoading: false });
          }
        } catch (error) {
          set({ error: "Login failed. Please try again.", isLoading: false });
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      signup: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Check if email already exists
          const existingUser = users.find(
            (u) => u.email.toLowerCase() === email.toLowerCase()
          );

          if (existingUser) {
            set({ error: "Email already in use", isLoading: false });
            return;
          }

          // Create new user (in a real app, this would be done on the server)
          const newUser: User = {
            id: `${users.length + 1}`,
            name,
            email,
            savedRestaurants: [],
          };

          set({ user: newUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ error: "Signup failed. Please try again.", isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
