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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "../database/database";

const Food_compo = ({ navigation, route }) => {
  const [title, setTitle] = useState(" - - -");
  const [updater, update] = useState("");
  const [description, setDescription] = useState(
    " - - - - - - - - - - - - - - - - - - -\n - - -"
  );
  const [img, setImg] = useState(
    "https://thumbs.gfycat.com/CompleteZanyIlsamochadegu-small.gif"
  );
  const [modifiers, setModifiers] = useState([]);
  const [booleanModifiers, setBooleanModifires] = useState([]);
  const [cuantity, setCuantity] = useState(1);
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
  function iconFor(booleanValue) {
    if (booleanValue == 1) {
      return "checkbox-intermediate";
    }
    return "checkbox-blank-outline";
  }
  function flip(value) {
    if (value == 1) {
      return -1;
    }
    return 1;
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
          for (let i = 0; i < product.data().modifiers.length; i++) {
            modifiers.push(product.data().modifiers[i]);
          }
          setModifiers(modifiers);
          getModifires(restaurantId, productId);
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });
      for (let i = 0; i < modifiers.length; i++) {
        booleanModifiers.push(-1);
      }
      setBooleanModifires(booleanModifiers);
    }
  }

  async function pushCart() {
    let itemToPush = {
      restaurantId: route.params.restaurantId,
      productId: route.params.foodId,
      cuantity: cuantity,
      modifires: [],
    };
    for (let i = 0; i < booleanModifiers.length; i++) {
      if (booleanModifiers[i] == 1) {
        itemToPush.modifires.push(modifiers[i].id);
      }
    }
    console.log(itemToPush);
    getCurrentCart(itemToPush);
  }

  async function getCurrentCart(itemToPush) {
    await firebase
      .firestore()
      .collection("users")
      .doc("CydewFVojffkrVbBuQQF")
      .get()
      .then((user) => {
        updateCart(user.data().cart, itemToPush);
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }

  async function updateCart(currentCart, itemToPush) {
    currentCart.push(itemToPush);
    await firebase
      .firestore()
      .collection("users")
      .doc("CydewFVojffkrVbBuQQF")
      .set({ cart: currentCart }, { merge: true });
  }

  async function getModifires(restaurantId, productId) {
    for (let i = 0; i < modifiers.length; i++) {
      await firebase
        .firestore()
        .collection("restaurants")
        .doc(restaurantId)
        .collection("modifiers")
        .doc(modifiers[i])
        .get()
        .then((modifier) => {
          modifiers[i] = {
            id: modifier.id,
            name: modifier.data().name,
            price: modifier.data().price,
          };
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });
      setModifiers(modifiers);
    }
    update(" ");
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
            <Text style={styles.updater}>{updater}</Text>
          </View>
          <View>
            {modifiers.map((modifier) => (
              <View style={styles.optionContainer}>
                <TouchableOpacity
                  onPress={() => {
                    booleanModifiers[modifiers.indexOf(modifier)] =
                      booleanModifiers[modifiers.indexOf(modifier)] * -1;
                    setBooleanModifires(booleanModifiers);
                    update(`${booleanModifiers}`);
                  }}
                >
                  <MaterialCommunityIcons
                    name={iconFor(
                      booleanModifiers[modifiers.indexOf(modifier)]
                    )}
                    size={26}
                    color="black"
                  />
                </TouchableOpacity>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionText}>{modifier.name}</Text>
                  <Text
                    style={styles.optionPrice}
                  >{`$ ${modifier.price}.00 MXN`}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.cuantityContainer}>
            <TouchableOpacity
              onPress={() => {
                setCuantity(cuantity - 1);
                if (cuantity <= 1) {
                  setCuantity(1);
                }
              }}
            >
              <View style={styles.modifyCuantity}>
                <Text style={styles.modifyCuantityText}>-</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.cuantity}>{cuantity}</Text>
            <TouchableOpacity
              onPress={() => {
                setCuantity(cuantity + 1);
              }}
            >
              <View style={styles.modifyCuantity}>
                <Text style={styles.modifyCuantityText}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              // pushCart();
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
    flexDirection: "row",
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
  optionContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    marginBottom: 2,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionText: {
    fontSize: 20,
    fontWeight: "400",
  },
  optionTextContainer: {
    width: "90%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionPrice: {
    fontWeight: "400",
  },
  updater: {
    fontSize: 1,
    color: "rgb(255,255,255)",
  },
  cuantityContainer: {
    backgroundColor: "rgb(255,255,255)",
    marginBottom: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 100,
  },
  modifyCuantity: {
    borderRadius: 50,
    borderWidth: 1,
    width: 60,
    height: 60,
    borderColor: "rgb(240,240,240)",
    justifyContent: "center",
    alignItems: "center",
  },
  modifyCuantityText: {
    fontSize: 30,
    fontWeight: "400",
  },
  cuantity: {
    fontWeight: "300",
    fontSize: 30,
    marginHorizontal: "5%",
  },
});

export default Food_compo;
