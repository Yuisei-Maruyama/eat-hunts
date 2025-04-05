import { StyleSheet, View, Text, Pressable } from "react-native";
import { Train } from "lucide-react-native";
import { Station } from "@/types";
import Colors from "@/constants/colors";

interface StationItemProps {
  station: Station;
  onPress: (station: Station) => void;
}

export default function StationItem({ station, onPress }: StationItemProps) {
  return (
    <Pressable style={styles.container} onPress={() => onPress(station)}>
      <View style={styles.iconContainer}>
        <Train size={20} color={Colors.info} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{station.name}</Text>
        <Text style={styles.location}>
          {station.coordinates.latitude.toFixed(4)},{" "}
          {station.coordinates.longitude.toFixed(4)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E6F2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
    marginBottom: 2,
  },
  location: {
    fontSize: 14,
    color: Colors.lightText,
  },
});
