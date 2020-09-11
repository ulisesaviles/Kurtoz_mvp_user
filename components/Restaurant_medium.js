import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Rating from "./Rating";

function Restaurant_medium(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Restaurant_compo");
      }}
    >
      <View style={styles.container}>
        <Image
          source={{
            uri:
              "https://d1ralsognjng37.cloudfront.net/3caa881c-8d86-48fe-8801-46c14997ec6d",
          }}
          style={styles.photo}
        />
        <View style={styles.descriptionContainer}>
          <View style={styles.horizontalAtributesContainer}>
            <Text style={styles.restaurantName}>{props.restaurantName}</Text>
            <Rating rating={4.8} />
          </View>
          <Text style={styles.restaurantCategory}>Café</Text>
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
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: "0.5%",
  },
});

export default Restaurant_medium;
