import { View, Text, StyleSheet } from "react-native";
import React from "react";
export default function Score({ children, style }) {

//   const setColor = () => {
//     if(children.split(" ")[0]=== "X"){
//         return "#ff6961"
//     }
//     return "#61f7ff"
//   };

  return (
    <View>
      <Text style={[styles.text]}>{children}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
