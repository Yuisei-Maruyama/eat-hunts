import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import {
  Stack,
  router,
  useSegments,
  useRootNavigationState,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ErrorBoundary } from "./error-boundary";
import { useAuthStore } from "@/store/auth-store";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function useProtectedRoute() {
  const { isAuthenticated } = useAuthStore();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    // Wait for navigation to be ready before redirecting
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === "auth";

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to the login page if not authenticated and not already in the auth group
      router.replace("/auth/login");
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to the home page if authenticated and trying to access auth pages
      router.replace("/");
    }
  }, [isAuthenticated, segments, navigationState?.key]);
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useProtectedRoute();

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <RootLayoutNav />
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="restaurant/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
    </Stack>
  );
}
