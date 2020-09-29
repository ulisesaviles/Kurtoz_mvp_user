import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";
import firebase from "../database/database";

function FoodMini(props) {
  const navigation = useNavigation();
  const [title, setTitle] = useState(" - - -");
  const [description, setDescription] = useState(" - - - - -\n - - -");
  const [price, setPrice] = useState(" - ");
  const [img, setImg] = useState(
    "https://thumbs.gfycat.com/CompleteZanyIlsamochadegu-small.gif"
  );

  async function getFood(foodId, restaurantId) {
    if (
      title == " - - -" &&
      description == " - - - - -\n - - -" &&
      price == " - " &&
      img == "https://thumbs.gfycat.com/CompleteZanyIlsamochadegu-small.gif"
    ) {
      await firebase
        .firestore()
        .collection("restaurants")
        .doc(restaurantId)
        .collection("products")
        .doc(foodId)
        .get()
        .then((product) => {
          setTitle(product.data().name);
          setDescription(product.data().description);
          setPrice(product.data().variants[0].price);
          setImg(product.data().img);
        });
    }
  }
  getFood(props.foodId, props.restaurantId);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Food_compo", {
          restaurantId: props.restaurantId,
          foodId: props.foodId,
        });
      }}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.FoodName}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.Price}>{`$ ${price}.00 MXN`}</Text>
        </View>
        <Image
          source={{
            uri: img,
          }}
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
