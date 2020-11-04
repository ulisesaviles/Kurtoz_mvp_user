import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import TarjetaMini from "./TarjetaMini";
import { useNavigation } from "@react-navigation/native";
import firebase from "../database/database";

const Ordenes_compo = () => {
  async function getPayments() {}
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.SafeAreaView_}>
      <View style={styles.header}>
        <Text style={styles.title}>Métodos de pago</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.tasjetasContainer}>
          <TarjetaMini />
          <TarjetaMini />
          <TarjetaMini />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Stripe");
          }}
        >
          <View style={styles.addPaymentContainer}>
            <Text style={styles.addPayment}>Add Payment Method</Text>
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
    height: "100%",
    backgroundColor: "rgb(240,240,240)",
  },
  header: {
    backgroundColor: "rgb(255,255,255)",
    height: "7%",
    justifyContent: "center",
  },
  title: {
    marginLeft: "20%",
    fontSize: 35,
    fontWeight: "400",
  },
  tasjetasContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    marginTop: "10%",
  },
  addPaymentContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addPayment: {
    fontSize: 18,
    fontWeight: "300",
  },
});

export default Ordenes_compo;
