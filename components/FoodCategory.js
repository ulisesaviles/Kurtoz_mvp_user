import React from "react";
import { StyleSheet, Text, View } from "react-native";

function FoodCategory() {
  return (
    <View style={styles.container}>
      <Text style={styles.category}>Nieves</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    marginTop: 4,
    padding: 20,
    justifyContent: "center",
  },
  category: {
    fontSize: 25,
    fontWeight: "300",
  },
});

export default FoodCategory;
