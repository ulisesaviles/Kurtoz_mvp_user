import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import firebase from "../database/database";

const Help = ({ navigation }) => {
  const dbRef = firebase.firestore().collection("users");

  // let setAda = dbRef.add({
  //   first: "Ada",
  //   last: "Lovelace",
  //   born: 1815,
  // });

  let setUli = dbRef.add({
    nombre: "uli",
  });

  firebase
    .firestore()
    .collection("users")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
      });
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });

  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: "center", fontSize: 50 }}>Help</Text>
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

export default Help;
