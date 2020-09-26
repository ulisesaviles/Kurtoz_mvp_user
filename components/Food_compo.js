import React, { useState } from "react";
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import OpcionMini from "./OpcionMini";
import firebase from "../database/database";

const Food_compo = ({ navigation, route }) => {
  // TODO: Get the modifiers from firebase to display them
  // TODO: Put the checkboxs to work hahah

  const [title, setTitle] = useState(" - - -");
  const [description, setDescription] = useState(
    " - - - - - - - - - - - - - - - - - - -\n - - -"
  );
  const [img, setImg] = useState(
    "https://thumbs.gfycat.com/CompleteZanyIlsamochadegu-small.gif"
  );
  const [modifiers, setModifiers] = useState([]);
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

  getProduct(route.params.restaurantId, route.params.foodId);

  async function getProduct(restaurantId, productId) {
    if (
      title == " - - -" &&
      img == "https://thumbs.gfycat.com/CompleteZanyIlsamochadegu-small.gif" &&
      modifiers.length == 0 &&
      description == " - - - - - - - - - - - - - - - - - - -\n - - -"
    ) {
      await firebase
        .firestore()
        .collection("restaurants")
        .doc(restaurantId)
        .collection("products")
        .doc(productId)
        .get()
        .then((product) => {
          setImg(product.data().img);
          setTitle(capitalize(product.data().name));
          setDescription(product.data().description);
          setModifiers(product.data().modifiers);
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });
    }
  }

  return (
    <View>
      <View style={styles.scrollContainer}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: img,
              }}
              style={styles.backgroundImage}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.opcionesContainer}>
            <Text style={styles.opciones}>Opciones</Text>
          </View>
          <View>
            {modifiers.map((modifier) => (
              <OpcionMini />
            ))}
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Carrito");
            }}
          >
            <View style={styles.addToCartBtn}>
              <Text style={styles.addToCart}>Add to cart</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    height: 260,
    backgroundColor: "rgb(0,0,0)",
  },
  title: {
    fontSize: 30,
    fontWeight: "400",
    marginBottom: 13,
  },
  scrollContainer: {
    backgroundColor: "rgb(240,240,240)",
    height: "100%",
  },
  descriptionContainer: {
    padding: 20,
    backgroundColor: "rgb(255, 255, 255)",
    marginBottom: 2,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "300",
  },
  opcionesContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    padding: 20,
  },
  opciones: {
    fontSize: 30,
    fontWeight: "300",
  },
  addToCartBtn: {
    backgroundColor: "rgb(0,0,0)",
    padding: 10,
    width: "95%",
    // borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
  },
  addToCart: {
    color: "rgb(255, 255, 255)",
    fontSize: 22,
    fontWeight: "600",
  },
});

export default Food_compo;
