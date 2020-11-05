import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import "react-native-gesture-handler";
import firebase from "../database/database";
import AsyncStorage from "@react-native-community/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import GoBackBtn from "./GoBackBtn";
import axios from "axios";

const Pay = ({ navigation, route }) => {
  const loadingImg =
    "https://thumbs.gfycat.com/CompleteZanyIlsamochadegu-small.gif";
  let userData;
  const [gotUser, setGotUser] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [userId, setUserId] = useState("");
  const [paymentState, setPaymentState] = useState("prePay"); // prePay => loading => success => declined
  const [booleanPayments, setBooleanPayments] = useState([]);
  const [updater, update] = useState([]);
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
          getPayments(userData.id);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  const [paymentMethods, setPaymentMethods] = useState([]);
  async function getPayments(userId) {
    await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .onSnapshot((user) => {
        setPaymentMethods(user.data().paymentMethods.data);
        let tempArray = [true];
        for (let i = 0; i < user.data().paymentMethods.data.length - 1; i++) {
          tempArray.push(false);
        }
        setBooleanPayments(tempArray);
        console.log(user.data().paymentMethods.data);
      });
  }

  async function handlePayment() {
    // console.log(route.params);
    setPaymentState("loading");
    try {
      await axios({
        method: "post",
        url:
          "https://us-central1-food-delivery-app-86ccd.cloudfunctions.net/pay",
        data: {
          userId: userId,
          ammountToPay: route.params.userOrder.total * 100,
          paymentIndex: booleanPayments.indexOf(true),
        },
      }).then(async (response) => {
        console.log(response);
        if (response.status == 200) {
          setPaymentState("success");
          await firebase
            .firestore()
            .collection("restaurants")
            .doc(route.params.userOrder.restaurantId)
            .collection("orders")
            .add(route.params.restaurantOrder);
          await firebase
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("orders")
            .add(route.params.userOrder);
          await firebase
            .firestore()
            .collection("users")
            .doc(userId)
            .update({ cart: { restaurantId: "", items: [] } });
        } else {
          setPaymentState("declined");
        }
      });
    } catch (error) {
      console.log(error);
      setPaymentState("declined");
    }
  }

  function cardBrand(brand) {
    if (brand == "mastercard") {
      return (
        <Image
          source={require("../assets/masterCard_icon.png")}
          style={styles.photo}
        />
      );
    } else if (brand == "visa") {
      return (
        <Image
          source={require("../assets/visa_icon.png")}
          style={styles.photo}
        />
      );
    } else if (brand == "amex") {
      return (
        <Image
          source={require("../assets/americanExpress_icon.png")}
          style={styles.photo}
        />
      );
    } else {
      return (
        <SimpleLineIcons
          name="credit-card"
          size={35}
          style={{ marginHorizontal: "3%" }}
          color="black"
        />
      );
    }
  }

  function booleanIcon(boolean) {
    if (boolean == true) {
      return "check-box";
    } else {
      return "check-box-outline-blank";
    }
  }

  function setSelected(selected) {
    let tempArray = booleanPayments;
    for (let i = 0; i < tempArray.length; i++) {
      tempArray[i] = false;
    }
    tempArray[selected] = true;
    setBooleanPayments(tempArray);
    update(tempArray.join());
  }

  function componentForState() {
    if (paymentState == "prePay") {
      return (
        <View style={styles.prePayContainer}>
          <Text style={styles.selectAPaymentMethod}>
            Seleccione un método de pago
          </Text>
          <View style={styles.cardsContainer}>
            {paymentMethods.map((paymentMethod) => (
              <View style={styles.cardContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setSelected(paymentMethods.indexOf(paymentMethod));
                  }}
                >
                  <MaterialIcons
                    name={booleanIcon(
                      booleanPayments[paymentMethods.indexOf(paymentMethod)]
                    )}
                    size={24}
                    color="black"
                    style={styles.boolean}
                  />
                </TouchableOpacity>
                {cardBrand(paymentMethod.card.brand)}
                <Text
                  style={styles.cardNumber}
                >{`••••  ••••  ••••  ${paymentMethod.card.last4}`}</Text>
              </View>
            ))}
            <TouchableOpacity
              onPress={() => {
                handlePayment();
              }}
            >
              <View style={styles.payBtn}>
                <Text style={styles.pay}>Realizar pago</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (paymentState == "success") {
      return (
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
              <View>
                <Text style={styles.continuar}>Continuar</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (paymentState == "loading") {
      return (
        <View style={styles.loadingContainer}>
          <Image
            source={{
              uri: loadingImg,
            }}
            style={styles.loadingImage}
          />
        </View>
      );
    } else if (paymentState == "declined") {
      return (
        <View style={styles.subContainer}>
          <View style={styles.transaccionContainer}>
            <Text style={styles.transaccion}>Transacción rechazada</Text>
            <MaterialIcons name="cancel" size={24} color="rgb(200,0,0)" />
          </View>
          <TouchableOpacity
            onPress={() => {
              setPaymentState("prePay");
            }}
          >
            <View style={styles.buttonContainer}>
              <Text style={styles.continuar}>{"Continuar"}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.goBackContainer}>
        <GoBackBtn />
      </View>
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
        <Text style={styles.invisible}>{updater}</Text>
      </View>
      <ScrollView>{componentForState()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "rgb(255,255,255)",
  },
  subContainer: {
    width: "100%",
    backgroundColor: "rgb(255,255,255)",
    alignItems: "center",
  },
  headerContainer: {
    height: "35%",
    backgroundColor: "rgb(255,255,255)",
    alignItems: "center",
  },
  restaurantImg: {
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
    paddingVertical: "3%",
    borderRadius: 30,
    marginVertical: "10%",
  },
  continuar: {
    color: "rgb(255,255,255)",
    fontSize: 30,
    fontWeight: "600",
  },
  goBackContainer: {
    backgroundColor: "rgb(255, 255, 255)",
  },
  loadingContainer: {
    backgroundColor: "rgb(255,255,255)",
    width: "100%",
    height: 1000,
    alignItems: "center",
  },
  loadingImage: {
    width: 200,
    height: 200,
  },
  prePayContainer: {
    backgroundColor: "rgb(255,255,255)",
    paddingHorizontal: "7%",
  },
  selectAPaymentMethod: {
    fontWeight: "600",
    color: "rgb(80,80,80)",
    fontSize: 18,
    marginBottom: "2%",
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "5%",
  },
  cardNumber: {
    marginLeft: "5%",
    fontWeight: "500",
  },
  boolean: {
    marginRight: "5%",
  },
  invisible: {
    fontSize: 1,
    color: "rgba(255,255,255,0)",
  },
  payBtn: {
    backgroundColor: "rgb(0,0,0)",
    paddingVertical: "5%",
    width: "80%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 40,
    alignItems: "center",
  },
  pay: {
    color: "rgb(255,255,255)",
    fontSize: 25,
    fontWeight: "600",
  },
});

export default Pay;
