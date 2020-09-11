import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Rating = (props) => {
  return (
    <View style={styles.ratingContainer}>
      <MaterialIcons
        style={styles.star}
        name={"star"}
        size={16}
        color={"rgb(0,0,0)"}
      />
      <Text style={styles.rating}>{props.rating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    width: 50,
    flexDirection: "row",
    backgroundColor: "rgb(245,245,245)",
    padding: "1%",
    borderRadius: 7,
  },
  rating: {
    fontSize: 16,
    fontWeight: "400",
  },
});

export default Rating;
