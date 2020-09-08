import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Food_medium() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Food_compo");
      }}
    >
      <View style={styles.container}>
        <Image
          source={require("../Examples/kurtoz_nieve.jpg")}
          style={styles.photo}
        />
        <View style={styles.descriptionContainer}>
          <View style={styles.horizontalAtributesContainer}>
            <Text style={styles.FoodName}>Nieve de Vainilla</Text>
            <Text style={styles.price}>$ 120.00 MXN</Text>
          </View>
          <Text style={styles.restaurantName}>Por: Kurtoz</Text>
          <Text style={styles.prepTime}>5 - 10 Min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255, 255, 255)",
    height: 240,
    width: 300,
    justifyContent: "center",
    alignContent: "space-around",
    marginHorizontal: 15,
    margin: 10,
  },
  photo: {
    width: "94%",
    margin: "3%",
    height: "64%",
  },
  descriptionContainer: {
    height: "30%",
    width: "100%",
    paddingHorizontal: "5%",
  },
  horizontalAtributesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "300",
  },
  FoodName: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: "0.5%",
  },
  price: {
    fontSize: 15,
  },
  prepTime: {
    fontSize: 14,
    fontWeight: "300",
  },
});

export default Food_medium;
