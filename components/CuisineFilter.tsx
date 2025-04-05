import { StyleSheet, View, Text, ScrollView, Pressable } from "react-native";
import { cuisineTypes } from "@/mocks/restaurants";
import Colors from "@/constants/colors";

interface CuisineFilterProps {
  selectedCuisine: string | null;
  onSelectCuisine: (cuisine: string | null) => void;
}

export default function CuisineFilter({
  selectedCuisine,
  onSelectCuisine,
}: CuisineFilterProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Pressable
          style={[
            styles.filterItem,
            selectedCuisine === null && styles.selectedFilterItem,
          ]}
          onPress={() => onSelectCuisine(null)}
        >
          <Text
            style={[
              styles.filterText,
              selectedCuisine === null && styles.selectedFilterText,
            ]}
          >
            All
          </Text>
        </Pressable>

        {cuisineTypes.map((cuisine) => (
          <Pressable
            key={cuisine}
            style={[
              styles.filterItem,
              selectedCuisine === cuisine && styles.selectedFilterItem,
            ]}
            onPress={() => onSelectCuisine(cuisine)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCuisine === cuisine && styles.selectedFilterText,
              ]}
            >
              {cuisine}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  filterItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
    marginRight: 8,
  },
  selectedFilterItem: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: Colors.text,
  },
  selectedFilterText: {
    color: "white",
    fontWeight: "500",
  },
});
