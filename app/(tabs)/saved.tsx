import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import { useRestaurantStore } from "@/store/restaurant-store";
import RestaurantCard from "@/components/RestaurantCard";
import EmptyState from "@/components/EmptyState";
import { Bookmark } from "lucide-react-native";
import Colors from "@/constants/colors";

export default function SavedScreen() {
  const { getSavedRestaurants } = useRestaurantStore();
  const savedRestaurants = getSavedRestaurants();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={savedRestaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <RestaurantCard restaurant={item} />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            title="No saved restaurants"
            message="Save your favorite restaurants to find them easily later"
            icon={<Bookmark size={32} color={Colors.lightText} />}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  cardContainer: {
    paddingHorizontal: 16,
  },
  listContent: {
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
});
