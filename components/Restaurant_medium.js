import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Restaurant_medium = ({ navigation }) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Image
          source={require("../Examples/pizzapepperoni.jpg")}
          style={styles.photo}
        />
        <View style={styles.descriptionContainer}>
          <View style={styles.horizontalAtributesContainer}>
            <Text style={styles.restaurantName}>Kurtoz</Text>
            <View style={styles.ratingContainer}>
              <MaterialIcons
                style={styles.star}
                name={"star"}
                size={16}
                color={"rgb(255,255,0)"}
              />
              <Text style={styles.rating}>4.8</Text>
            </View>
          </View>
          <Text style={styles.restaurantCategory}>Café</Text>
          <Text style={styles.prepTime}>5 - 10 Min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

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
  ratingContainer: {
    flexDirection: "row",
    backgroundColor: "rgb(245,245,245)",
    padding: "1%",
    borderRadius: 7,
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
  rating: {
    fontSize: 16,
    fontWeight: "400",
  },
});

export default Restaurant_medium;
