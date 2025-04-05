import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useAuthStore } from "@/store/auth-store";
import { useRestaurantStore } from "@/store/restaurant-store";
import { LogOut, Settings, Heart, Clock, MapPin } from "lucide-react-native";
import Colors from "@/constants/colors";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const {
    getSavedRestaurants,
    getRecentlyViewedRestaurants,
    clearRecentlyViewed,
  } = useRestaurantStore();

  const savedCount = getSavedRestaurants().length;
  const recentCount = getRecentlyViewedRestaurants().length;

  const handleLogout = () => {
    logout();
    router.replace("/auth/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Profile Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri:
                user?.profileImage ||
                "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{user?.name || "Guest User"}</Text>
          <Text style={styles.email}>{user?.email || "guest@example.com"}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Heart size={24} color={Colors.primary} />
            <Text style={styles.statValue}>{savedCount}</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Clock size={24} color={Colors.info} />
            <Text style={styles.statValue}>{recentCount}</Text>
            <Text style={styles.statLabel}>Recent</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <MapPin size={24} color={Colors.success} />
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Visited</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <Pressable style={styles.menuItem}>
            <Settings size={20} color={Colors.text} style={styles.menuIcon} />
            <Text style={styles.menuText}>Settings</Text>
          </Pressable>

          <Pressable style={styles.menuItem} onPress={clearRecentlyViewed}>
            <Clock size={20} color={Colors.text} style={styles.menuIcon} />
            <Text style={styles.menuText}>Clear Recent History</Text>
          </Pressable>

          <Pressable
            style={[styles.menuItem, styles.logoutItem]}
            onPress={handleLogout}
          >
            <LogOut size={20} color={Colors.error} style={styles.menuIcon} />
            <Text style={[styles.menuText, styles.logoutText]}>Log Out</Text>
          </Pressable>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Restaurant Finder v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2023 Restaurant Finder</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: "center",
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 4,
    color: Colors.text,
  },
  email: {
    fontSize: 16,
    color: Colors.lightText,
  },
  statsContainer: {
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
    color: Colors.text,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.lightText,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
  },
  menuContainer: {
    paddingTop: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: Colors.text,
  },
  logoutItem: {
    marginTop: 16,
  },
  logoutText: {
    color: Colors.error,
  },
  appInfo: {
    padding: 24,
    alignItems: "center",
  },
  appVersion: {
    fontSize: 14,
    color: Colors.lightText,
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: Colors.lightText,
  },
});
