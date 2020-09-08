import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";

function FoodMini() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Food_compo");
      }}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.FoodName}>Nieve de Vainilla</Text>
          <Text style={styles.description}>
            Nieve de Vainilla en cono de galleta de chocolate suizo super mega
            rico sí señor.
          </Text>
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
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  description: {
    width: "100%",
    fontWeight: "300",
    marginBottom: "4%",
  },
  FoodName: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: "5%",
  },
  textContainer: {
    width: "60%",
    height: "100%",
  },
  Price: {
    fontWeight: "400",
  },
});

export default FoodMini;
