import { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import { useRestaurantStore } from "@/store/restaurant-store";
import { restaurants } from "@/mocks/restaurants";
import { Restaurant } from "@/types";
import MapView from "@/components/MapView";
import RestaurantCard from "@/components/RestaurantCard";
import CuisineFilter from "@/components/CuisineFilter";
import Colors from "@/constants/colors";

export default function DiscoverScreen() {
  const { getSavedRestaurants, getRecentlyViewedRestaurants } =
    useRestaurantStore();
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [filteredRestaurants, setFilteredRestaurants] =
    useState<Restaurant[]>(restaurants);

  const savedRestaurants = getSavedRestaurants();
  const recentlyViewed = getRecentlyViewedRestaurants();

  useEffect(() => {
    if (selectedCuisine) {
      setFilteredRestaurants(
        restaurants.filter((r) => r.cuisine === selectedCuisine)
      );
    } else {
      setFilteredRestaurants(restaurants);
    }
  }, [selectedCuisine]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Map Section */}
        <View style={styles.mapSection}>
          <MapView
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            onSelectRestaurant={setSelectedRestaurant}
          />
        </View>

        {/* Cuisine Filter */}
        <CuisineFilter
          selectedCuisine={selectedCuisine}
          onSelectCuisine={setSelectedCuisine}
        />

        {/* Saved Restaurants Section */}
        {savedRestaurants.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saved Restaurants</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {savedRestaurants.map((restaurant) => (
                <View key={restaurant.id} style={styles.compactCardContainer}>
                  <RestaurantCard restaurant={restaurant} compact />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Recently Viewed Section */}
        {recentlyViewed.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recently Viewed</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {recentlyViewed.map((restaurant) => (
                <View key={restaurant.id} style={styles.compactCardContainer}>
                  <RestaurantCard restaurant={restaurant} compact />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* All Restaurants Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCuisine
              ? `${selectedCuisine} Restaurants`
              : "All Restaurants"}
          </Text>
          <View style={styles.restaurantList}>
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </View>
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
  scrollView: {
    flex: 1,
  },
  mapSection: {
    height: 300,
  },
  section: {
    padding: 16,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: Colors.text,
  },
  horizontalList: {
    paddingRight: 16,
  },
  compactCardContainer: {
    width: 200,
  },
  restaurantList: {
    marginBottom: 16,
  },
});
