import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Restaurant_medium from "./Restaurant_medium";
import Food_medium from "./Food_medium";

const HomeHorizontalScroll = (props) => {
  function capitalize(word) {
    arr = word.split(" ");
    word = "";
    for (let i = 0; i < arr.length; i++) {
      word += arr[i][0].toUpperCase();
      for (let j = 1; j < arr[i].length; j++) {
        word += arr[i][j];
      }
      word += " ";
    }
    return word;
  }

  if (props.category == "restaurantes disponibles") {
    return (
      <View style={styles.HScrollContainer}>
        <Text style={styles.HScrollTitle}>{capitalize(props.category)}</Text>
        <ScrollView horizontal>
          {props.restaurants.map((restaurant) => (
            <Restaurant_medium restaurantId={restaurant} />
          ))}
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={styles.HScrollContainer}>
        <Text style={styles.HScrollTitle}>{capitalize(props.category)}</Text>
        <ScrollView horizontal>
          {props.products.map((product) => (
            <Food_medium
              id={product}
              restaurantName={props.restaurantName}
              restaurantId={props.restaurantId}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  HScrollContainer: {
    marginTop: "5%",
    backgroundColor: "rgb(245, 245, 245)",
  },
  HScrollTitle: {
    fontSize: 25,
    marginLeft: "5%",
    marginBottom: "2%",
    fontWeight: "500",
    color: "rgb(40,40,40)",
  },
});

export default HomeHorizontalScroll;
