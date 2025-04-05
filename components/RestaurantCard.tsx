import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { Link } from "expo-router";
import { Heart } from "lucide-react-native";
import { Restaurant } from "@/types";
import { useRestaurantStore } from "@/store/restaurant-store";
import Colors from "@/constants/colors";

interface RestaurantCardProps {
  restaurant: Restaurant;
  compact?: boolean;
  onPress?: () => void; // Added onPress prop
}

export default function RestaurantCard({
  restaurant,
  compact = false,
  onPress,
}: RestaurantCardProps) {
  const { isSaved, saveRestaurant, unsaveRestaurant } = useRestaurantStore();
  const saved = isSaved(restaurant.id);

  const handleSaveToggle = () => {
    if (saved) {
      unsaveRestaurant(restaurant.id);
    } else {
      saveRestaurant(restaurant.id);
    }
  };

  const renderPriceLevel = () => {
    return "$".repeat(restaurant.priceLevel);
  };

  // Handle both navigation and custom onPress if provided
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Link href={`/restaurant/${restaurant.id}`} asChild onPress={handlePress}>
      <Pressable style={compact ? styles.compactContainer : styles.container}>
        <Image
          source={{ uri: restaurant.photos[0] }}
          style={compact ? styles.compactImage : styles.image}
        />

        <Pressable
          style={styles.heartButton}
          onPress={(e) => {
            e.stopPropagation();
            handleSaveToggle();
          }}
        >
          <Heart
            size={24}
            color={saved ? Colors.primary : "white"}
            fill={saved ? Colors.primary : "transparent"}
          />
        </Pressable>

        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {restaurant.name}
          </Text>

          <View style={styles.detailsRow}>
            <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.price}>{renderPriceLevel()}</Text>
            <Text style={styles.dot}>•</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>{restaurant.rating.toFixed(1)}</Text>
            </View>
          </View>

          {!compact && (
            <Text style={styles.address} numberOfLines={1}>
              {restaurant.address}
            </Text>
          )}
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  compactContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    width: 200,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: "100%",
    height: 180,
  },
  compactImage: {
    width: "100%",
    height: 120,
  },
  heartButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 8,
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: Colors.text,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 14,
    color: Colors.lightText,
  },
  dot: {
    marginHorizontal: 4,
    color: Colors.lightText,
  },
  price: {
    fontSize: 14,
    color: Colors.lightText,
  },
  ratingContainer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  address: {
    fontSize: 14,
    color: Colors.lightText,
  },
});
