import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import firebase from "../database/database";
import "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

const Cart_compo = ({ navigation, route }) => {
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [restaurantName, setRestaurantName] = useState(" - - - ");
  const [restaurantImg, setRestaurantImg] = useState("");
  const [requestDone, setRequestDone] = useState(false);
  const [cart, setCart] = useState([]);
  const [restaurantId, setRestaurantId] = useState(" -");
  let userData;
  const [userData_, setUserData_] = useState("");
  const [gotUser, setGotUser] = useState(false);

  async function getUser() {
    if (!gotUser) {
      setGotUser(true);
      try {
        let value = await AsyncStorage.getItem("userData");
        value = JSON.parse(value);
        if (value !== null) {
          userData = value;
          setUserData_(userData);
          // console.log(value);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function getCart() {
    if (requestDone == false && !gotUser) {
      await getUser();
      await firebase
        .firestore()
        .collection("users")
        .doc(userData.id)
        .onSnapshot((user) => {
          setRequestDone(true);
          setCart(user.data().cart.items);
          setRestaurantId(user.data().cart.restaurantId);
          let total_ = 0;
          for (let i = 0; i < user.data().cart.items.length; i++) {
            total_ +=
              user.data().cart.items[i].productPrice *
              user.data().cart.items[i].cuantity;
          }
          setTotal(total_);
          getRestaurantDetails(user.data().cart.restaurantId);
        });
    }
  }
  getCart();

  async function getRestaurantDetails(restaurantId_) {
    await firebase
      .firestore()
      .collection("restaurants")
      .doc(restaurantId_)
      .get()
      .then((restaurant) => {
        setOpen(restaurant.data().open);
        setRestaurantName(restaurant.data().name);
        setRestaurantImg(restaurant.data().img);
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }
  async function completeOrder() {
    ///////////////////////////////////////////////
    let userHasPaymentMethods = false;
    await firebase
      .firestore()
      .collection("users")
      .doc(userData_.id)
      .get()
      .then((user) => {
        if (user.data().paymentMethods.data.length > 0) {
          userHasPaymentMethods = true;
        }
      });
    if (userHasPaymentMethods) {
      await firebase
        .firestore()
        .collection("restaurants")
        .doc(restaurantId)
        .get()
        .then(async (restaurant) => {
          setOpen(restaurant.data().open);
          let open_ = restaurant.data().open;
          if (open_ == true) {
            // let today = new Date();
            // today = today.getTime();
            let order = {
              createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
              products: cart, // Quitarle la data del restaurant a cada producto por ser duplicada
              type: "active",
              total: total,
              user: {
                id: userData_.id,
                name: userData_.name,
              },
            };
            let temp = [];
            for (let i = 0; i < order.products.length; i++) {
              temp.push({
                quantity: order.products[i].cuantity,
                modifierGroups: order.products[i].modifierGroups,
                productId: order.products[i].productId,
                productImg: order.products[i].productImg,
                productName: order.products[i].productName,
                price: order.products[i].productPrice,
                variant: order.products[i].variant,
                variantIndex: order.products[i].variantIndex,
              });
            }
            order.products = temp;
            // console.log(order);
            navigation.navigate("Pay", {
              order: order,
              restaurantId: restaurantId,
              restaurantName: restaurantName,
              restaurantImg: restaurantImg,
            });
            // let userOrder = {
            //   date: today,
            //   products: cart,
            //   restaurantId: restaurantId,
            //   restaurantName: restaurantName,
            //   restaurantImg: restaurantImg,
            //   type: "active",
            //   total: total,
            // };
            // let restaurantCart = [];
            // let product;
            // for (let i = 0; i < cart.length; i++) {
            //   product = cart[i];
            //   // console.log(product);
            //   let modifiers = [];
            //   for (let j = 0; j < product.modifires.length; j++) {
            //     modifiers.push({
            //       id: product.modifires[j].id,
            //       quantity: 1,
            //     });
            //   }
            //   let restaurantProduct = {
            //     quantity: product.cuantity,
            //     id: product.productId,
            //     variant: product.variantIndex,
            //     modifiers: modifiers,
            //   };
            //   restaurantCart.push(restaurantProduct);
            // }
            // let restaurantOrder = {
            //   type: "active",
            //   total: total,
            //   user: {
            //     name: userData_.name,
            //     id: userData_.id,
            //   },
            //   createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
            //   products: restaurantCart,
            // };

            //////////////////////////////////////////////////////////////////////

            // await firebase
            //   .firestore()
            //   .collection("restaurants")
            //   .doc(restaurantId)
            //   .collection("orders")
            //   .add(order);

            // await firebase
            //   .firestore()
            //   .collection("users")
            //   .doc(userData_.id)
            //   .collection("orders")
            //   .add(userOrder);

            // navigation.navigate("Pay", {
            //   // restaurantOrder: restaurantOrder,
            //   // userOrder: userOrder,
            //   order: order,
            //   restaurantId: restaurantId,
            // });

            // setRestaurantId(" -");
            // updateCart([]);
          } else {
            Alert.alert(
              `${restaurantName} se encuentra cerrado`,
              "Inténtalo más tarde",
              [
                {
                  text: "OK",
                  onPress: () => console.log("OK Pressed"),
                },
              ],
              { cancelable: false }
            );
          }
        });
    } else {
      Alert.alert(
        "Debes ingresar un método de pago antes de completar la órden",
        "",
        [
          {
            text: "Agregar ahora",
            onPress: () => navigation.navigate("Cuenta"),
          },
          {
            text: "Más tarde",
            onPress: () => console.log("OK Pressed"),
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  }
  async function updateCart(cart_) {
    await firebase
      .firestore()
      .collection("users")
      .doc(userData_.id)
      .update({ cart: { restaurantId: restaurantId, items: cart_ } });
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
                <View style={styles.restaurantNameContainer}>
                  <Text style={styles.restaurantName}>{restaurantName}</Text>
                  <View style={styles.restaurantNameLine} />
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
                              {cartItem.modifierGroups.map((modifierGroup) => (
                                <>
                                  <Text style={styles.variant}>
                                    {`• ${modifierGroup.name}:`}
                                  </Text>
                                  {modifierGroup.selected.map((modifier) => (
                                    <View
                                      style={
                                        styles.foodMiniExtraIngredientContainer
                                      }
                                    >
                                      <Text style={styles.extraPrice}>
                                        {`+ $${modifier.price}.00 MXN`}
                                      </Text>
                                      <Text
                                        style={styles.foodMiniExtraIngredient}
                                      >
                                        {modifier.name}
                                      </Text>
                                    </View>
                                  ))}
                                </>
                              ))}
                            </View>
                            <Text style={styles.foodMiniPrice}>
                              {`$ ${cartItem.productPrice}.00 MXN`}
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
          <TouchableOpacity onPress={completeOrder}>
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
    height: "93%",
    backgroundColor: "rgb(240,240,240)",
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: "rgb(255,255,255)",
    height: "7%",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    marginTop: 10,
    fontSize: 30,
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
  restaurantNameContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    alignItems: "center",
    marginTop: 2,
    paddingTop: "8%",
    paddingBottom: "8%",
  },
  restaurantName: {
    fontSize: 40,
    fontWeight: "300",
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
    // backgroundColor: "red",
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
    marginBottom: 2,
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
  restaurantNameLine: {
    height: 1.3,
    width: "30%",
    backgroundColor: "rgb(0,0,0)",
    marginTop: "5%",
  },
});

export default Cart_compo;
