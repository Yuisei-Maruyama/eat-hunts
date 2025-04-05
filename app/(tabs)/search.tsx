import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Text,
  Pressable,
} from "react-native";
import { useSearchStore } from "@/store/search-store";
import { useRestaurantStore } from "@/store/restaurant-store";
import { Station } from "@/types";
import SearchBar from "@/components/SearchBar";
import RestaurantCard from "@/components/RestaurantCard";
import StationItem from "@/components/StationItem";
import EmptyState from "@/components/EmptyState";
import { MapPin, Search as SearchIcon } from "lucide-react-native";
import Colors from "@/constants/colors";

export default function SearchScreen() {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    stationResults,
    searchRestaurants,
    searchStations,
    selectStation,
    selectedStation,
    clearSearch,
  } = useSearchStore();

  const { addToRecentlyViewed } = useRestaurantStore();

  const [searchMode, setSearchMode] = useState<"restaurants" | "stations">(
    "restaurants"
  );

  useEffect(() => {
    if (searchQuery.length > 2) {
      if (searchMode === "restaurants") {
        searchRestaurants();
      } else {
        searchStations();
      }
    }
  }, [searchQuery, searchMode]);

  const handleStationSelect = (station: Station) => {
    selectStation(station);
    setSearchMode("restaurants");
  };

  const renderEmptyState = () => {
    if (searchQuery.length === 0) {
      return (
        <EmptyState
          title="Search for restaurants or stations"
          message="Find your next favorite place to eat"
          icon={<SearchIcon size={32} color={Colors.lightText} />}
        />
      );
    }

    if (searchQuery.length < 3) {
      return (
        <EmptyState
          title="Keep typing..."
          message="Enter at least 3 characters to search"
          icon={<SearchIcon size={32} color={Colors.lightText} />}
        />
      );
    }

    return (
      <EmptyState
        title="No results found"
        message={`We couldn't find any ${searchMode} matching "${searchQuery}"`}
        icon={<SearchIcon size={32} color={Colors.lightText} />}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={
          searchMode === "restaurants" ? searchRestaurants : searchStations
        }
        onClear={clearSearch}
        placeholder={
          searchMode === "restaurants"
            ? "Search restaurants..."
            : "Search train stations..."
        }
      />

      {/* Search Mode Tabs */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, searchMode === "restaurants" && styles.activeTab]}
          onPress={() => setSearchMode("restaurants")}
        >
          <Text
            style={[
              styles.tabText,
              searchMode === "restaurants" && styles.activeTabText,
            ]}
          >
            Restaurants
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, searchMode === "stations" && styles.activeTab]}
          onPress={() => setSearchMode("stations")}
        >
          <Text
            style={[
              styles.tabText,
              searchMode === "stations" && styles.activeTabText,
            ]}
          >
            Train Stations
          </Text>
        </Pressable>
      </View>

      {/* Selected Station */}
      {selectedStation && searchMode === "restaurants" && (
        <View style={styles.selectedStationContainer}>
          <View style={styles.selectedStationContent}>
            <MapPin size={16} color={Colors.info} />
            <Text style={styles.selectedStationText}>
              Near {selectedStation.name}
            </Text>
          </View>
          <Pressable
            style={styles.clearStationButton}
            onPress={() => selectStation(null)}
          >
            <Text style={styles.clearStationText}>Clear</Text>
          </Pressable>
        </View>
      )}

      {/* Results */}
      {searchMode === "restaurants" ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <RestaurantCard
                restaurant={item}
                onPress={() => addToRecentlyViewed(item.id)}
              />
            </View>
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyState}
        />
      ) : (
        <FlatList
          data={stationResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <StationItem station={item} onPress={handleStationSelect} />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyState}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: Colors.lightText,
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: "500",
  },
  selectedStationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  selectedStationContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedStationText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  clearStationButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  clearStationText: {
    color: Colors.primary,
    fontSize: 14,
  },
  cardContainer: {
    paddingHorizontal: 16,
  },
  listContent: {
    flexGrow: 1,
    paddingTop: 8,
    paddingBottom: 16,
  },
});
