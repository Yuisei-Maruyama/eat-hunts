import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Colors from "@/constants/colors";

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

export default function EmptyState({ title, message, icon }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {icon ? (
        <View style={styles.iconContainer}>{icon}</View>
      ) : (
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400",
          }}
          style={styles.image}
        />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: Colors.lightText,
    textAlign: "center",
    maxWidth: 300,
  },
});
