import { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Linking,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import {
  Heart,
  MapPin,
  Clock,
  Phone,
  Globe,
  ChevronLeft,
  Share2,
} from "lucide-react-native";
import { getRestaurantById } from "@/mocks/restaurants";
import { useRestaurantStore } from "@/store/restaurant-store";
import MapView from "@/components/MapView";
import Colors from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { Platform } from "react-native";

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const restaurant = getRestaurantById(id);

  const { isSaved, saveRestaurant, unsaveRestaurant, addToRecentlyViewed } =
    useRestaurantStore();
  const saved = restaurant ? isSaved(restaurant.id) : false;

  useEffect(() => {
    if (restaurant) {
      addToRecentlyViewed(restaurant.id);
    }
  }, [restaurant?.id]);

  if (!restaurant) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Restaurant not found</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const handleSaveToggle = () => {
    if (saved) {
      unsaveRestaurant(restaurant.id);
    } else {
      saveRestaurant(restaurant.id);
    }
  };

  const handleCall = () => {
    if (restaurant.phone) {
      Linking.openURL(`tel:${restaurant.phone}`);
    }
  };

  const handleWebsite = () => {
    if (restaurant.website) {
      Linking.openURL(restaurant.website);
    }
  };

  const handleShare = () => {
    // In a real app, this would use the Share API
    alert(`Sharing ${restaurant.name}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScrollView style={styles.scrollView}>
        {/* Header Image */}
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: restaurant.photos[0] }}
            style={styles.headerImage}
          />

          {/* Gradient Overlay */}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            style={styles.gradient}
          />

          {/* Back Button */}
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ChevronLeft size={24} color="white" />
          </Pressable>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Pressable style={styles.actionButton} onPress={handleShare}>
              <Share2 size={24} color="white" />
            </Pressable>
            <Pressable style={styles.actionButton} onPress={handleSaveToggle}>
              <Heart
                size={24}
                color="white"
                fill={saved ? Colors.primary : "transparent"}
              />
            </Pressable>
          </View>

          {/* Restaurant Info Overlay */}
          <View style={styles.infoOverlay}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <View style={styles.detailsRow}>
              <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.price}>
                {"$".repeat(restaurant.priceLevel)}
              </Text>
              <Text style={styles.dot}>•</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>
                  {restaurant.rating.toFixed(1)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.description}>{restaurant.description}</Text>
          </View>

          {/* Address */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MapPin size={20} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Location</Text>
            </View>
            <Text style={styles.address}>{restaurant.address}</Text>

            {/* Map */}
            <View style={styles.mapContainer}>
              <MapView
                restaurants={[restaurant]}
                selectedRestaurant={restaurant}
                showList={false}
              />
            </View>
          </View>

          {/* Hours */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Clock size={20} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Hours</Text>
            </View>
            {Object.entries(restaurant.hours).map(([day, hours]) => (
              <View key={day} style={styles.hoursRow}>
                <Text style={styles.day}>{day}</Text>
                <Text style={styles.hours}>{hours}</Text>
              </View>
            ))}
          </View>

          {/* Contact */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Contact</Text>
            </View>

            {restaurant.phone && (
              <Pressable style={styles.contactItem} onPress={handleCall}>
                <Phone
                  size={20}
                  color={Colors.primary}
                  style={styles.contactIcon}
                />
                <Text style={styles.contactText}>{restaurant.phone}</Text>
              </Pressable>
            )}

            {restaurant.website && (
              <Pressable style={styles.contactItem} onPress={handleWebsite}>
                <Globe
                  size={20}
                  color={Colors.primary}
                  style={styles.contactIcon}
                />
                <Text style={styles.contactText}>{restaurant.website}</Text>
              </Pressable>
            )}
          </View>

          {/* Photos */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Photos</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.photosContainer}
            >
              {restaurant.photos.map((photo, index) => (
                <Image
                  key={index}
                  source={{ uri: photo }}
                  style={styles.photo}
                />
              ))}
            </ScrollView>
          </View>

          {/* Tags */}
          <View style={styles.section}>
            <View style={styles.tagsContainer}>
              {restaurant.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <Pressable
          style={[styles.saveButton, saved && styles.savedButton]}
          onPress={handleSaveToggle}
        >
          <Heart
            size={20}
            color={saved ? "white" : Colors.primary}
            fill={saved ? "white" : "transparent"}
            style={styles.saveButtonIcon}
          />
          <Text
            style={[styles.saveButtonText, saved && styles.savedButtonText]}
          >
            {saved ? "Saved" : "Save"}
          </Text>
        </Pressable>

        <Pressable style={styles.directionsButton}>
          <Text style={styles.directionsButtonText}>Get Directions</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  notFoundText: {
    fontSize: 18,
    marginBottom: 20,
  },
  headerContainer: {
    position: "relative",
    height: 300,
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtons: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    right: 16,
    flexDirection: "row",
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  infoOverlay: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: "600",
    color: "white",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cuisine: {
    fontSize: 16,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  dot: {
    marginHorizontal: 6,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  price: {
    fontSize: 16,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  ratingContainer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 6,
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
    color: Colors.text,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
  },
  address: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 12,
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 8,
  },
  hoursRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  day: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
  },
  hours: {
    fontSize: 16,
    color: Colors.text,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  contactIcon: {
    marginRight: 12,
  },
  contactText: {
    fontSize: 16,
    color: Colors.text,
  },
  photosContainer: {
    paddingRight: 16,
  },
  photo: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginRight: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: Colors.lightText,
  },
  bottomBar: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginRight: 12,
  },
  savedButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  saveButtonIcon: {
    marginRight: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.primary,
  },
  savedButtonText: {
    color: "white",
  },
  directionsButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  directionsButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  backButtonText: {
    color: Colors.primary,
    fontSize: 16,
  },
});
