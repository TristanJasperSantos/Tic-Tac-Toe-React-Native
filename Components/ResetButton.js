import { Pressable, Text, StyleSheet } from "react-native";
import React from "react";

export default function ResetButton({ children, onPress }) {
  return (
    <Pressable style={styles.buttonStyle} onPress={onPress}>
        <Text style={styles.resetText}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "#61ff69",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    flex: 2,
    borderRadius: 10,
  },
  resetText: {
    fontWeight: "bold",
  },
});
