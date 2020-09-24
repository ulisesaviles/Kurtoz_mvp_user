import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Restaurant_medium from "./Restaurant_medium";
import Food_medium from "./Food_medium";

const HomeHorizontalScroll = (props) => {
  // console.log(`${props.category} :  ${props.products}`);
  // let productos = props.products;
  // console.log(productos);
  let holas = ["hola", "hola"];
  if (props.category == "restaurantes disponibles") {
    return (
      <View style={styles.HScrollContainer}>
        <Text style={styles.HScrollTitle}>{props.category}</Text>
        <ScrollView horizontal>
          <Restaurant_medium restaurantName="Kurtoz Rolling and Bakery" />
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={styles.HScrollContainer}>
        <Text style={styles.HScrollTitle}>{props.category}</Text>
        <ScrollView horizontal>
          {props.products.map((product) => (
            <Food_medium foodId={product} />
            // <Food_medium />
            // <Food_medium />
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
