import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Cart_FoodMini from "./Cart_FoodMini";
import DeliveryDetails from "./DeliveryDetails";

const Cart_compo = () => {
  return (
    <SafeAreaView style={styles.SafeAreaView_}>
      <View style={styles.header}>
        <Text style={styles.title}>Carrito</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.scrollContainer}>
          <ScrollView>
            <DeliveryDetails />
            <View style={styles.itemsContainer}>
              <View style={styles.tuOrdenContainer}>
                <Text style={styles.tuOrden}>Tu Orden</Text>
              </View>
              <Cart_FoodMini />
              <Cart_FoodMini />
              <Cart_FoodMini />
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity>
          <View style={styles.addToCartBtn}>
            <Text style={styles.addToCart}>Completar Orden</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView_: {
    marginTop: Platform.OS === "ios" ? 0 : 22,
    backgroundColor: "rgb(255,255,255)",
    height: "100%",
  },
  container: {
    height: "95%",
    backgroundColor: "rgb(240,240,240)",
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: "rgb(255,255,255)",
    height: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
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
    alignSelf: "center",
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
});

export default Cart_compo;
