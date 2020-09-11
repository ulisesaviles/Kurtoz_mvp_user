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
          source={{
            uri:
              "https://scontent.ftij1-1.fna.fbcdn.net/v/t1.0-9/27858576_172626690015090_2321536906365458293_n.jpg?_nc_cat=106&_nc_sid=8bfeb9&_nc_eui2=AeE6-6KCW8trFvQxazSM4QEVvUI5v6I1YP29Qjm_ojVg_YDtO5jdy0dbUu7-EY1U01jsEj6eEsAMtg1vNlDi0orZ&_nc_ohc=DCKP55MdsHUAX9BGKN1&_nc_ht=scontent.ftij1-1.fna&oh=1269804a0024db38e16ba82f993fb37a&oe=5F814571",
          }}
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
