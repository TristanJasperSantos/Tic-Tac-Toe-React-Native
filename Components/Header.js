import { View, Text, StyleSheet } from "react-native";
import React from "react";
export default function Header({ children }) {
  return (
    <View>
      <Text style={styles.turn}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  turn: {
    marginBottom: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
});
