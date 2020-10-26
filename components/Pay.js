import React, { useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import StripeContainer from "./StripeContainer";
import firebase from "../database/database";
import AsyncStorage from "@react-native-community/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

const Pay = ({ navigation, route }) => {
  let userData;
  const [gotUser, setGotUser] = useState(false);
  const [settedListener, setSettedListener] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [userId, setUserId] = useState("");
  getUser();
  async function getUser() {
    if (!gotUser) {
      setGotUser(true);
      try {
        let value = await AsyncStorage.getItem("userData");
        value = JSON.parse(value);
        if (value !== null) {
          userData = value;
          setUserId(userData.id);
          setListener(userData.id);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  const [paymentInProcess, setPaymentInProcess] = useState(false);
  async function setListener(userId) {
    if (!settedListener) {
      setSettedListener(true);
      setPaymentInProcess(true);
      await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .set({ paymentInProcess: true }, { merge: true });
      await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .onSnapshot((user) => {
          setPaymentInProcess(user.data().paymentInProcess);
          setCustomerId(user.data().customerId);
        });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: route.params.userOrder.restaurantImg }}
          style={styles.restaurantImg}
        />
        <Text style={styles.title}>
          {route.params.userOrder.restaurantName}
        </Text>
        <Text
          style={styles.total}
        >{`$ ${route.params.userOrder.total}.00 MXN`}</Text>
      </View>
      <View style={{ height: paymentInProcess == true ? "55%" : "1%" }}>
        <StripeContainer
          total={route.params.userOrder.total}
          userId={userId}
          userOrder={route.params.userOrder}
          restaurantOrder={route.params.restaurantOrder}
        />
      </View>
      <View style={styles.subContainer}>
        <View style={styles.transaccionContainer}>
          <Text style={styles.transaccion}>
            Transacción realizada con éxito
          </Text>
          <MaterialIcons name="check-circle" size={24} color="rgb(0,200,0)" />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Órdenes");
          }}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.continuar}>Continuar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "rgb(240,240,240)",
  },
  subContainer: {
    width: "100%",
    height: "20%",
    backgroundColor: "rgb(255,255,255)",
    alignItems: "center",
  },
  headerContainer: {
    height: "45%",
    backgroundColor: "rgb(255,255,255)",
    // backgroundColor: "red",
    alignItems: "center",
  },
  restaurantImg: {
    marginTop: "20%",
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  title: {
    marginTop: "3%",
    fontSize: 20,
    fontWeight: "400",
  },
  total: {
    marginTop: "3%",
    fontSize: 25,
    fontWeight: "500",
  },
  transaccion: {
    fontSize: 20,
    fontWeight: "500",
    marginRight: "3%",
  },
  transaccionContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    paddingHorizontal: 40,
    backgroundColor: "rgb(0,0,0)",
    paddingVertical: 10,
    borderRadius: 30,
    marginVertical: "10%",
  },
  continuar: {
    color: "rgb(255,255,255)",
    fontSize: 30,
    fontWeight: "600",
  },
});

export default Pay;
