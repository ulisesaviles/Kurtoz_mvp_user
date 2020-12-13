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
import AsyncStorage from "@react-native-community/async-storage";

const Ordenes_compo = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [updater, update] = useState("");
  const [doneRequest, setDoneRequest] = useState(false);
  let userData;
  const [gotUser, setGotUser] = useState(false);
  const [itemsCount, setItemsCount] = useState([]);

  async function getUser() {
    if (!gotUser) {
      setGotUser(true);
      try {
        let value = await AsyncStorage.getItem("userData");
        value = JSON.parse(value);
        if (value !== null) {
          userData = value;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  function sort(array) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - 1; j++) {
        if (array[j].data.date < array[j + 1].data.date) {
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
    return array.slice(0, 10);
  }

  async function getOrders() {
    if (!doneRequest && !gotUser) {
      await getUser();
      setDoneRequest(true);
      await firebase
        .firestore()
        .collection("users")
        .doc(userData.id)
        .collection("orders")
        .onSnapshot(async (orders_) => {
          let orders__ = [];
          await orders_.forEach(async (order) => {
            await firebase
              .firestore()
              .collection("restaurants")
              .doc(order.data().restaurantId)
              .collection("orders")
              .doc(order.data().orderId)
              .onSnapshot((restaurantOrder) => {
                let exists = false;
                for (let i = 0; i < orders__.length; i++) {
                  if (
                    orders__[i].order.createdAt.isEqual(
                      restaurantOrder.data().createdAt
                    )
                  ) {
                    exists = true;
                    orders__[i] = {
                      auxData: order.data(),
                      order: restaurantOrder.data(),
                    };
                  }
                }
                if (!exists) {
                  orders__.push({
                    auxData: order.data(),
                    order: restaurantOrder.data(),
                  });
                }
                update(order.data().orderId);
                let temp = [];
                for (let i = 0; i < orders__.length; i++) {
                  temp.push(0);
                  for (let j = 0; j < orders__[i].order.products.length; j++) {
                    temp[i] += orders__[i].order.products[j].quantity;
                  }
                }
                setItemsCount(temp);
              });
          });
          orders__ = sort(orders__);
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
        <ScrollView style={styles.ScrollView}>
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
                      uri: order.auxData.restaurantImg,
                    }}
                    style={styles.restaurantImg}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.restaurantName}>
                      {order.auxData.restaurantName}
                    </Text>
                    <Text style={styles.detailLine}>{`${
                      itemsCount[orders.indexOf(order)]
                    } artículos • $${order.order.total}.00 MXN`}</Text>
                    <View style={styles.inlineContainer}>
                      <Text style={styles.detailLine}>{`${humanDate(
                        order.order.createdAt.toDate()
                      )} • `}</Text>
                      <Text
                        style={{
                          color:
                            order.order.type == "active" ||
                            order.order.type == "ready"
                              ? "rgb(0, 200, 0)"
                              : "rgb(0,0,0)",
                          fontWeight:
                            order.order.type == "active" ||
                            order.order.type == "ready"
                              ? "600"
                              : "400",
                        }}
                      >{`${capitalize(order.order.type)}`}</Text>
                    </View>
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
    height: "93%",
    backgroundColor: "rgb(240,240,240)",
    justifyContent: "space-around",
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
  ordenContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    marginBottom: 2,
    flexDirection: "row",
    padding: 20,
  },
  updater: {
    color: "rgb(255, 255, 255)",
    fontSize: 1,
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
  ScrollView: {
    height: "100%",
  },
  inlineContainer: {
    flexDirection: "row",
  },
});

export default Ordenes_compo;
