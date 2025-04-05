import { StyleSheet, View, TextInput, Pressable } from "react-native";
import { Search, X } from "lucide-react-native";
import Colors from "@/constants/colors";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  onClear?: () => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  onSubmit,
  onClear,
  placeholder = "Search restaurants or stations...",
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.lightText} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.lightText}
          returnKeyType="search"
          onSubmitEditing={onSubmit}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {value.length > 0 && (
          <Pressable
            style={styles.clearButton}
            onPress={() => {
              onChangeText("");
              onClear?.();
            }}
          >
            <X size={16} color={Colors.lightText} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    height: "100%",
  },
  clearButton: {
    padding: 4,
  },
});
