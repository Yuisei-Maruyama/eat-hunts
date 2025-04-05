import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { MapPin, Navigation } from "lucide-react-native";
import { Restaurant } from "@/types";
import Colors from "@/constants/colors";
import { useRestaurantStore } from "@/store/restaurant-store";

interface MapViewProps {
  restaurants: Restaurant[];
  selectedRestaurant?: Restaurant | null;
  onSelectRestaurant?: (restaurant: Restaurant) => void;
  showList?: boolean;
}

export default function MapView({
  restaurants,
  selectedRestaurant,
  onSelectRestaurant,
  showList = true,
}: MapViewProps) {
  const { isSaved } = useRestaurantStore();

  const handleRestaurantPress = (restaurant: Restaurant) => {
    // Navigate programmatically instead of using Link for web compatibility
    router.push(`/restaurant/${restaurant.id}`);
  };

  // This is a simplified map view since we can't use actual maps
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <View style={styles.map}>
          {/* Map background */}
          <View style={styles.mapBackground} />

          {/* Map markers */}
          {restaurants.map((restaurant) => (
            <Pressable
              key={restaurant.id}
              style={[
                styles.marker,
                {
                  left: `${
                    ((restaurant.coordinates.longitude - 139.69) / 0.1) * 100
                  }%`,
                  top: `${
                    100 -
                    ((restaurant.coordinates.latitude - 35.65) / 0.1) * 100
                  }%`,
                },
                selectedRestaurant?.id === restaurant.id &&
                  styles.selectedMarker,
              ]}
              onPress={() => onSelectRestaurant?.(restaurant)}
            >
              <MapPin
                size={24}
                color={
                  isSaved(restaurant.id)
                    ? Colors.mapSavedMarker
                    : Colors.mapMarker
                }
                fill={
                  isSaved(restaurant.id)
                    ? Colors.mapSavedMarker
                    : Colors.mapMarker
                }
              />
            </Pressable>
          ))}
        </View>

        {/* Selected restaurant info */}
        {selectedRestaurant && (
          <View style={styles.selectedInfo}>
            <Image
              source={{ uri: selectedRestaurant.photos[0] }}
              style={styles.selectedImage}
            />
            <View style={styles.selectedDetails}>
              <Text style={styles.selectedName}>{selectedRestaurant.name}</Text>
              <Text style={styles.selectedCuisine}>
                {selectedRestaurant.cuisine}
              </Text>
              <Pressable
                style={styles.viewButton}
                onPress={() =>
                  router.push(`/restaurant/${selectedRestaurant.id}`)
                }
              >
                <Text style={styles.viewButtonText}>View Details</Text>
              </Pressable>
            </View>
            <Pressable style={styles.navigationButton}>
              <Navigation size={20} color="white" />
            </Pressable>
          </View>
        )}
      </View>

      {showList && (
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Nearby Restaurants</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalList}
          >
            {restaurants.map((restaurant) => (
              <Pressable
                key={restaurant.id}
                style={[
                  styles.listItem,
                  selectedRestaurant?.id === restaurant.id &&
                    styles.selectedListItem,
                ]}
                onPress={() => {
                  onSelectRestaurant?.(restaurant);
                  // Don't navigate immediately when selecting from the list
                }}
              >
                <Image
                  source={{ uri: restaurant.photos[0] }}
                  style={styles.listItemImage}
                />
                <Text style={styles.listItemName} numberOfLines={1}>
                  {restaurant.name}
                </Text>
                <Text style={styles.listItemCuisine}>{restaurant.cuisine}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
    position: "relative",
  },
  mapBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.mapBackground,
  },
  marker: {
    position: "absolute",
    transform: [{ translateX: -12 }, { translateY: -24 }],
    zIndex: 1,
  },
  selectedMarker: {
    zIndex: 2,
    transform: [{ translateX: -12 }, { translateY: -24 }, { scale: 1.2 }],
  },
  selectedInfo: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  selectedDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  selectedName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  selectedCuisine: {
    fontSize: 14,
    color: Colors.lightText,
    marginBottom: 8,
  },
  viewButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  viewButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  navigationButton: {
    backgroundColor: Colors.info,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginLeft: 8,
  },
  listContainer: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  horizontalList: {
    flexDirection: "row",
  },
  listItem: {
    width: 140,
    marginRight: 12,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f8f8f8",
  },
  selectedListItem: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  listItemImage: {
    width: "100%",
    height: 100,
  },
  listItemName: {
    fontSize: 14,
    fontWeight: "500",
    padding: 8,
    paddingBottom: 4,
  },
  listItemCuisine: {
    fontSize: 12,
    color: Colors.lightText,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});
