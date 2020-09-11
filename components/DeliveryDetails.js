import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

function DeliveryDetails() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.restaurantNameContainer}>
        <Text style={styles.restaurantName}>Kurtoz</Text>
        <View style={styles.titleSeparador} />
      </View>
      <TouchableOpacity
      // onPress={() => {
      //   navigation.navigate("Food_compo");
      // }}
      >
        <View style={styles.directionContainer}>
          <Image
            source={{
              uri:
                "https://www.themeboy.com/wp-content/themes/themeboy/images/extensions/google-maps-screenshot.png",
            }}
            style={styles.photo}
          />
          <View style={styles.directionTextContainer}>
            <Text style={styles.dierctionP1}>Bahía de Ballenas #322</Text>
            <Text style={styles.dierctionP2}>El Mirador, Tijuana, B.C.</Text>
            <Text style={styles.dierctionP2}>Delivery</Text>
            <Text style={styles.dierctionP2}>Add instructions</Text>
          </View>
        </View>
        <View style={styles.deliveryTimeContainer}>
          <MaterialIcons name="timer" size={18} color="rgb(0,0,0)" />
          <Text style={styles.deliveryTime}>Delivery Time: 20-30 min</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    marginBottom: 2,
    paddingHorizontal: "8%",
    paddingVertical: "3%",
  },
  restaurantNameContainer: {
    alignItems: "center",
  },
  restaurantName: {
    fontSize: 40,
    fontWeight: "300",
  },
  titleSeparador: {
    backgroundColor: "rgb(0, 0, 0)",
    height: 1,
    width: "60%",
    marginVertical: "10%",
  },
  directionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  photo: {
    height: 100,
    width: 100,
    borderRadius: 5,
  },
  directionTextContainer: {
    marginHorizontal: "5%",
  },
  dierctionP1: {
    fontSize: 18,
  },
  dierctionP2: {
    fontSize: 16,
    fontWeight: "300",
    marginTop: "2%",
  },
  deliveryTimeContainer: {
    marginVertical: "5%",
    flexDirection: "row",
    alignItems: "center",
  },
  deliveryTime: {
    marginLeft: "2%",
    fontSize: 18,
    fontWeight: "400",
    marginTop: "2%",
  },
});

export default DeliveryDetails;
