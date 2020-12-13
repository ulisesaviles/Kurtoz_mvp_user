import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Rating from "./Rating";
import firebase from "../database/database";

function Restaurant_medium(props) {
  const navigation = useNavigation();
  const [name, setName] = useState(" - - -");
  const [category, setCategory] = useState(" - -");
  const [delivery, setDelivery] = useState(" - -");
  const [rating, setRating] = useState(" -");
  const [img, setImg] = useState(
    "https://thumbs.gfycat.com/CompleteZanyIlsamochadegu-small.gif"
  );
  const [open, setOpen] = useState(true);

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

  getRestaurant(props.restaurantId);
  async function getRestaurant(restaurantId) {
    if (
      name == " - - -" &&
      category == " - -" &&
      delivery == " - -" &&
      rating == " -" &&
      img == "https://thumbs.gfycat.com/CompleteZanyIlsamochadegu-small.gif"
    ) {
      await firebase
        .firestore()
        .collection("restaurants")
        .doc(restaurantId)
        .get()
        .then((restaurant) => {
          setOpen(restaurant.data().open);
          setImg(restaurant.data().img);
          setName(capitalize(restaurant.data().name));
          setCategory(restaurant.data().category);
          if (restaurant.data().delivery.hasDelivery == false) {
            setDelivery("Pick-up only");
          } else {
            setDelivery(restaurant.data().delivery.time);
          }
          setRating(restaurant.data().rating);
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });
    }
  }
  if (open == true) {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Restaurant_compo", { id: props.restaurantId });
        }}
      >
        <View style={styles.container}>
          <Image
            source={{
              uri: img,
            }}
            style={styles.photo}
          />
          <View style={styles.descriptionContainer}>
            <View style={styles.horizontalAtributesContainer}>
              <Text style={styles.restaurantName}>{name}</Text>
              <Rating rating={rating} />
            </View>
            <Text style={styles.restaurantCategory}>{category}</Text>
            <Text style={styles.prepTime}>{delivery}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Restaurant_compo", { id: props.restaurantId });
        }}
      >
        <View style={styles.container}>
          <View style={styles.photoContainer}>
            <ImageBackground
              source={{
                uri: img,
              }}
              style={styles.photoBackground}
              resizeMode="cover"
            >
              <View style={styles.closeContainer}>
                <Text style={styles.close}>CERRADO</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.descriptionContainer}>
            <View style={styles.horizontalAtributesContainer}>
              <Text style={styles.restaurantName}>{name}</Text>
              <Rating rating={rating} />
            </View>
            <Text style={styles.restaurantCategory}>{category}</Text>
            <Text style={styles.prepTime}>{delivery}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
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
  photoBackground: {
    width: "100%",
    margin: "0%",
    height: "100%",
  },
  photoContainer: {
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
  restaurantCategory: {
    fontSize: 16,
    fontWeight: "300",
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: "0.5%",
  },
  prepTime: {
    fontSize: 14,
    fontWeight: "300",
  },
  closeContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  close: {
    fontSize: 40,
    fontWeight: "600",
    color: "rgb(255,255,255)",
  },
});

export default Restaurant_medium;
