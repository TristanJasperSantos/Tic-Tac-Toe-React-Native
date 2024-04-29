import { View, Text,Pressable, StyleSheet } from "react-native";
import React from "react";


export default function GridItem({children, pressHandle}) {
  return (
    <Pressable style={styles.grid} onPress={pressHandle}>
      <View style={styles.textcontainer}>
        <Text style={[{color: children === "X" ? "#ff6961": "#61f7ff"},styles.text]}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  grid: {
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
  },
  textcontainer: {
    width: 100,
    height: 150,
    alignItems: "center",
  },
  text: {
    fontSize: 120,
  },
});
