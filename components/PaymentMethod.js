import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import TarjetaMini from "./TarjetaMini";
import { useNavigation } from "@react-navigation/native";
import firebase from "../database/database";
import GoBackBtn from "./GoBackBtn";
import AsyncStorage from "@react-native-community/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

const Ordenes_compo = () => {
  let userData;
  const [gotUser, setGotUser] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);

  async function getUser() {
    if (!gotUser) {
      setGotUser(true);
      try {
        let value = await AsyncStorage.getItem("userData");
        value = JSON.parse(value);
        if (value !== null) {
          userData = value;
          getPayments(userData.id);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  getUser();

  async function getPayments(userId) {
    await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .onSnapshot((user) => {
        setPaymentMethods(user.data().paymentMethods.data);
      });
  }
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.goBackContainer}>
          <GoBackBtn style={styles.goBack} />
        </View>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.header}>Agregar tarjeta</Text>
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.tasjetasContainer}>
            {paymentMethods.map((paymentMethod) => (
              <TarjetaMini
                brand={paymentMethod.card.brand}
                last4={paymentMethod.card.last4}
              />
            ))}
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Stripe");
            }}
          >
            <View style={styles.addPaymentContainer}>
              <MaterialIcons name="add" size={24} color="black" />
              <Text style={styles.addPayment}>Agregar método de pago</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "88%",
    backgroundColor: "rgb(240,240,240)",
  },
  headerContainer: {
    flexDirection: "row",
    height: "12%",
    borderBottomColor: "rgb(100,100,100)",
    backgroundColor: "rgb(255,255,255)",
    marginBottom: 1,
  },
  goBackContainer: {
    height: "100%",
    paddingTop: "12%",
    paddingLeft: "5%",
    width: "20%",
  },
  headerTitleContainer: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: "15%",
    fontSize: 25,
    fontWeight: "600",
  },
  tasjetasContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    marginTop: "5%",
  },
  addPaymentContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: "15%",
    flexDirection: "row",
    alignItems: "center",
  },
  addPayment: {
    fontSize: 18,
    fontWeight: "400",
    marginLeft: "3%",
  },
});

export default Ordenes_compo;
