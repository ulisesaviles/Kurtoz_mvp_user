import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import firebase from "../database/database";
import { useNavigation } from "@react-navigation/native";

const Ordenes_compo = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [updater, update] = useState("");
  const [doneRequest, setDoneRequest] = useState(false);
  async function getOrders() {
    if (!doneRequest) {
      setDoneRequest(true);
      await firebase
        .firestore()
        .collection("users")
        .doc("CydewFVojffkrVbBuQQF")
        .collection("orders")
        .onSnapshot((orders_) => {
          let orders__ = [];
          orders_.forEach((order) => {
            orders__.push({
              id: order.id,
              data: order.data(),
            });
          });
          setOrders(orders__);
          update(orders.length);
        });
    }
  }
  getOrders();

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

  function humanDate(timeStamp) {
    let date = new Date(timeStamp);
    return `${date.getDate()} ${stringMonth(date.getMonth())}`;
  }

  function stringMonth(intMonth) {
    if (intMonth == 0) {
      return "Ene";
    } else if (intMonth == 1) {
      return "Feb";
    } else if (intMonth == 2) {
      return "Mar";
    } else if (intMonth == 3) {
      return "Abr";
    } else if (intMonth == 4) {
      return "May";
    } else if (intMonth == 5) {
      return "Jun";
    } else if (intMonth == 6) {
      return "Jul";
    } else if (intMonth == 7) {
      return "Ago";
    } else if (intMonth == 8) {
      return "Sep";
    } else if (intMonth == 9) {
      return "Oct";
    } else if (intMonth == 10) {
      return "Nov";
    } else if (intMonth == 11) {
      return "Dic";
    }
  }

  return (
    <SafeAreaView style={styles.SafeAreaView_}>
      <View style={styles.header}>
        <Text style={styles.title}>Órdenes</Text>
        <Text style={styles.updater}>{updater}</Text>
      </View>
      <View style={styles.container}>
        <ScrollView>
          <>
            {orders.map((order) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Orden", {
                    order: order,
                  });
                }}
              >
                <View style={styles.ordenContainer}>
                  <Image
                    source={{
                      uri: order.data.restaurantImg,
                    }}
                    style={styles.restaurantImg}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.restaurantName}>
                      {order.data.restaurantName}
                    </Text>
                    <Text
                      style={styles.detailLine}
                    >{`${order.data.products.length} items • $${order.data.total}.00 MXN`}</Text>
                    <Text style={styles.detailLine}>{`${humanDate(
                      order.data.date
                    )} • ${capitalize(order.data.type)}`}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
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
  },
  header: {
    backgroundColor: "rgb(255,255,255)",
    height: "7%",
    alignContent: "center",
    flexDirection: "row",
  },
  title: {
    marginLeft: "10%",
    fontSize: 35,
    fontWeight: "500",
  },
  ordenContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    marginBottom: 2,
    flexDirection: "row",
    padding: 20,
  },
  updater: {
    color: "rgb(255, 255, 255)",
  },
  restaurantImg: {
    height: 90,
    width: 90,
    borderRadius: 10,
    marginRight: "5%",
  },
  textContainer: {},
  restaurantName: {
    fontSize: 22,
    fontWeight: "500",
    marginVertical: "5%",
  },
  detailLine: {
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 5,
  },
});

export default Ordenes_compo;
