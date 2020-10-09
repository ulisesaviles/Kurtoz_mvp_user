import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import firebase from "../database/database";
import axios from "axios";
// import { firebase } from "@react-native-firebase/functions";
// import functions from "@react-native-firebase/functions";

const About = ({ navigation }) => {
  // axios({
  //   method: "GET",
  //   url:
  //     "https://us-central1-food-delivery-app-86ccd.cloudfunctions.net/createStripeUser",
  //   // data: {
  //   //   email: "alguien@example.com",
  //   //   id: "CydewFVojffkrVbBuQQF",
  //   // },
  // }).then((response) => {
  //   console.log(response.data);
  // });
  axios({
    method: "get",
    url: "http://localhost:5001/food-delivery-app-86ccd/us-central1/sayHello",
    data: {
      name: "Ulises",
    },
  }).then((Response) => {
    console.log(Response);
  });

  let today = new Date();
  let order = {
    createdAt: {
      seconds: Math.floor(today.getTime() / 1000),
    },
    products: [
      {
        id: "6k0TJESaADWe36aouDp8",
        modifiers: [
          {
            id: "9NtWtu742k2lryIxTd9y",
            quantity: 1,
          },
        ],
        cuantity: 2,
        variant: 0,
      },
      {
        id: "AkwsYsedm7BXcRxQgK51",
        modifiers: [],
        cuantity: 1,
        variant: 0,
      },
    ],
    total: 200,
    type: "active",
    user: "CydewFVojffkrVbBuQQF",
  };

  async function postOrder() {
    await firebase
      .firestore()
      .collection("restaurants")
      .doc("tpiauGjqb5yg1bA7qJmm")
      .collection("orders")
      .add(order);
  }
  // console.log(order);
  // postOrder();

  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: "center", fontSize: 50 }}>About</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "rgb(240,240,240)",
    justifyContent: "space-around",
  },
});

export default About;
