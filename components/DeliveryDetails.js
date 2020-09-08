import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";

function DeliveryDetails() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
    // onPress={() => {
    //   navigation.navigate("Food_compo");
    // }}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.FoodName}>Nieve de Vainilla</Text>
          <View style={styles.extraIngredients}>
            <View style={styles.extraIngredientContainer}>
              <Text style={styles.extraPrice}>+ $20.00 MXN</Text>
              <Text style={styles.extraIngredient}>Crema batida</Text>
            </View>
            <View style={styles.extraIngredientContainer}>
              <Text style={styles.extraPrice}>+ $20.00 MXN</Text>
              <Text style={styles.extraIngredient}>Crema batida</Text>
            </View>
            <View style={styles.extraIngredientContainer}>
              <Text style={styles.extraPrice}>+ $20.00 MXN</Text>
              <Text style={styles.extraIngredient}>Crema batida</Text>
            </View>
          </View>
          <Text style={styles.Price}>$ 120.00 MXN</Text>
        </View>
        <Image
          source={require("../Examples/kurtoz_nieve.jpg")}
          style={styles.photo}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    marginBottom: 2,
    paddingHorizontal: "8%",
    paddingVertical: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  extraIngredient: {
    width: "100%",
    marginBottom: "4%",
  },
  extraIngredients: {
    fontWeight: "300",
    width: "100%",
  },
  FoodName: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: "5%",
  },
  textContainer: {
    width: "65%",
    height: "100%",
    marginRight: "8%",
  },
  Price: {
    fontSize: 14,
    fontWeight: "500",
  },
  extraIngredient: {
    alignSelf: "flex-end",
  },
  extraIngredientContainer: {
    fontWeight: "400",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "2%",
    paddingLeft: "4%",
  },
});

export default DeliveryDetails;
