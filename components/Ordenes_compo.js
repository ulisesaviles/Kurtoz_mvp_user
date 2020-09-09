import React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import Cart_FoodMini from "./Cart_FoodMini";

const Ordenes_compo = () => {
  return (
    <SafeAreaView style={styles.SafeAreaView_}>
      <View style={styles.header}>
        <Text style={styles.title}>Órdenes</Text>
      </View>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.ordenContainer}>
            <View style={styles.tuOrdenContainer}>
              <Text style={styles.tuOrden}>7/sep/20</Text>
            </View>
            <Cart_FoodMini />
            <Cart_FoodMini />
            <Cart_FoodMini />
            <View style={styles.totalContainer}>
              <Text style={styles.total}>Total: $ 360.00 MXN</Text>
            </View>
          </View>
        </ScrollView>
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
    height: "100%",
    backgroundColor: "rgb(240,240,240)",
    justifyContent: "space-around",
    // alignItems: "center",
  },
  header: {
    backgroundColor: "rgb(255,255,255)",
    height: "7%",
    justifyContent: "center",
  },
  HScrollContainer: {
    marginTop: "5%",
    backgroundColor: "rgb(245, 245, 245)",
  },
  title: {
    marginLeft: "10%",
    fontSize: 35,
    fontWeight: "500",
  },
  HScrollTitle: {
    fontSize: 25,
    marginLeft: "5%",
    marginBottom: "2%",
    fontWeight: "500",
  },
  ordenContainer: {
    alignItems: "center",
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
  totalContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    paddingVertical: "3%",
    paddingHorizontal: "5%",
  },
  total: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default Ordenes_compo;
