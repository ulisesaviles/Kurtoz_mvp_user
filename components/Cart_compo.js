import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
// import DeliveryDetails from "./DeliveryDetails";
import firebase from "../database/database";
import "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Cart_compo = ({ navigation, route }) => {
  const [cart, setCart] = useState([]);
  const [requestDone, setRequestDone] = useState(false);
  const [total, setTotal] = useState(0);

  async function getCart() {
    if (requestDone == false) {
      await firebase
        .firestore()
        .collection("users")
        .doc("CydewFVojffkrVbBuQQF")
        .onSnapshot((user) => {
          setRequestDone(true);
          setCart(user.data().cart);
          let total_ = 0;
          for (let i = 0; i < user.data().cart.length; i++) {
            total_ +=
              user.data().cart[i].productPrice * user.data().cart[i].cuantity;
          }
          setTotal(total_);
        });
    }
  }
  getCart();
  async function updateCart(cart_) {
    await firebase
      .firestore()
      .collection("users")
      .doc("CydewFVojffkrVbBuQQF")
      .update({ cart: cart_ });
  }

  if (cart.length > 0) {
    return (
      <SafeAreaView style={styles.SafeAreaView_}>
        <View style={styles.header}>
          <Text style={styles.title}>Carrito</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.scrollContainer}>
            <ScrollView>
              {/* <DeliveryDetails /> */}
              <View style={styles.itemsContainer}>
                <View style={styles.tuOrdenContainer}>
                  <Text style={styles.tuOrden}>Tu Órden</Text>
                </View>
                <>
                  {cart.map((cartItem) => (
                    <View style={styles.foodMinisuperContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Food_compo", {
                            restaurantId: cartItem.restaurantId,
                            foodId: cartItem.productId,
                          });
                        }}
                      >
                        <View style={styles.foodMiniContainer}>
                          <View style={styles.foodMinitextContainer}>
                            <View style={styles.foodMiniTtitleContainer}>
                              <View style={styles.cuantityContainer}>
                                <Text style={styles.foodMiniCuantity}>
                                  {cartItem.cuantity}
                                </Text>
                              </View>
                              <Text style={styles.foodMiniFoodName}>
                                {cartItem.productName}
                              </Text>
                            </View>
                            <View style={styles.variantContainer}>
                              <Text style={styles.variant}>
                                {cartItem.variant}
                              </Text>
                            </View>
                            <View style={styles.foodMiniExtraIngredients}>
                              {cartItem.modifires.map((modifier) => (
                                <View
                                  style={
                                    styles.foodMiniExtraIngredientContainer
                                  }
                                >
                                  <Text style={styles.extraPrice}>
                                    {`+ $${modifier.price}.00 MXN`}
                                  </Text>
                                  <Text style={styles.foodMiniExtraIngredient}>
                                    {modifier.name}
                                  </Text>
                                </View>
                              ))}
                            </View>
                            <Text style={styles.foodMiniPrice}>
                              {`$ ${
                                cartItem.productPrice * cartItem.cuantity
                              }.00 MXN`}
                            </Text>
                          </View>
                          <Image
                            source={{
                              uri: cartItem.productImg,
                            }}
                            style={styles.foodMiniPhoto}
                          />
                        </View>
                      </TouchableOpacity>
                      <View style={styles.foodMiniDeleteContainer}>
                        <TouchableOpacity
                          onPress={() => {
                            cart.splice(cart.indexOf(cartItem), 1);
                            setCart(cart);
                            updateCart(cart);
                          }}
                        >
                          <MaterialCommunityIcons
                            name="minus-circle"
                            size={24}
                            color="rgb(200,0,0)"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </>
              </View>
            </ScrollView>
          </View>
          <TouchableOpacity>
            <View style={styles.addToCartBtn}>
              <View style={styles.addToCartContainer}>
                <Text style={styles.addToCart}>Completar Orden</Text>
              </View>
              <Text style={styles.total}>{`$ ${total}.00 MXN`}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.SafeAreaView_}>
        <View style={styles.header}>
          <Text style={styles.title}>Carrito</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.noItemsContainer}>
            <Text style={styles.noItems}>Tu carrito está vacío</Text>
            <MaterialCommunityIcons
              name="cart-off"
              size={30}
              color="rgb(100,100,100)"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  SafeAreaView_: {
    marginTop: Platform.OS === "ios" ? 0 : 22,
    backgroundColor: "rgb(255,255,255)",
    height: "100%",
  },
  container: {
    height: "89%",
    backgroundColor: "rgb(240,240,240)",
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: "rgb(255,255,255)",
    height: "10%",
    justifyContent: "center",
  },
  title: {
    marginLeft: "12%",
    fontSize: 40,
    fontWeight: "500",
  },
  itemsContainer: {
    alignItems: "center",
  },
  addToCartBtn: {
    backgroundColor: "rgb(0,0,0)",
    padding: 10,
    width: "95%",
    alignItems: "center",
    justifyContent: "flex-end",
    alignSelf: "center",
    flexDirection: "row",
  },
  addToCart: {
    color: "rgb(255, 255, 255)",
    fontSize: 22,
    fontWeight: "600",
  },
  scrollContainer: {
    height: "93%",
  },
  tuOrdenContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    alignItems: "center",
    marginTop: "2%",
    paddingTop: "3%",
  },
  tuOrden: {
    fontSize: 30,
    fontWeight: "400",
  },
  foodMiniContainer: {
    // backgroundColor: "red",
    width: "90%",
    marginBottom: 2,
    paddingLeft: "3%",
    paddingVertical: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  foodMiniPhoto: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginLeft: "8%",
  },
  foodMiniExtraIngredient: {
    width: "100%",
    marginBottom: "4%",
  },
  foodMiniExtraIngredients: {
    fontWeight: "300",
    width: "100%",
    marginLeft: "15%",
  },
  foodMiniFoodName: {
    fontSize: 20,
    fontWeight: "400",
  },
  foodMinitextContainer: {
    width: "65%",
    height: "100%",
    marginRight: "8%",
  },
  foodMiniPrice: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: "15%",
  },
  foodMiniExtraIngredient: {
    alignSelf: "flex-end",
  },
  foodMiniExtraIngredientContainer: {
    fontWeight: "400",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "2%",
    paddingLeft: "4%",
  },
  foodMinisuperContainer: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "rgb(255, 255, 255)",
  },
  foodMiniDeleteContainer: {
    // backgroundColor: "blue",
    width: "8%",
    marginLeft: "-3%",
    alignItems: "center",
    justifyContent: "center",
  },
  foodMiniCuantity: {
    fontSize: 15,
    color: "rgb(255,255,255)",
    color: "rgb(0,0,0)",
    marginRight: "4%",
  },
  cuantityContainer: {
    backgroundColor: "rgb(240,240,240)",
    width: 20,
    height: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "5%",
  },
  foodMiniTtitleContainer: {
    flexDirection: "row",
  },
  noItemsContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  noItems: {
    fontSize: 30,
    fontWeight: "400",
    color: "rgb(100,100,100)",
  },
  variantContainer: {
    marginLeft: "15%",
    marginBottom: "2%",
  },
  addToCartContainer: {
    width: "50%",
    alignItems: "center",
  },
  total: {
    color: "rgb(150,150,150)",
    fontSize: 15,
    fontWeight: "700",
  },
});

export default Cart_compo;
