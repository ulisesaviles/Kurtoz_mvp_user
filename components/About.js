import React, { useState } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import firebase from "../database/database";
// import axios from "axios";
// import Picker from "@react-native-community/picker";
import AsyncStorage from "@react-native-community/async-storage";
// import { firebase } from "@react-native-firebase/functions";
// import functions from "@react-native-firebase/functions";

const About = ({ navigation }) => {
  const [obj, setObj] = useState("Aboutt");
  // const storeData = async (value) => {
  //   try {
  //     const jsonValue = JSON.stringify(value);
  //     await AsyncStorage.setItem("userData", jsonValue);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // storeData({ name: "Ulises", apellido: "Aviles" });

  async function getUser() {
    try {
      const value = await AsyncStorage.getItem("userData");
      if (value !== null) {
        setObj(value);
        console.log(value);
      }
    } catch (e) {
      console.log(e);
    }
  }
  getUser();

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

  // axios({
  //   method: "get",
  //   url: "http://localhost:5001/food-delivery-app-86ccd/us-central1/sayHello",
  //   data: {
  //     name: "Ulises",
  //   },
  // }).then((Response) => {
  //   console.log(Response);
  // });

  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: "center", fontSize: 50 }}>{obj}</Text>
      {/* <Picker
      // selectedValue={"java"}
      // style={{ height: 50, width: 100 }}

      // onValueChange={}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker> */}
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
