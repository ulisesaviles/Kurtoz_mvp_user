import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import firebase from "../database/database";

const Help = ({ navigation }) => {
  const dbRef = firebase
    .firestore()
    .collection("restaurants")
    .doc("tpiauGjqb5yg1bA7qJmm")
    .collection("products")
    .doc("uqZgKW0lgwBWSH7am7ju");

  function postProduct() {
    dbRef.set({
      Alcohol: false,
      available: true,
      count_sold: 0,
      description:
        "El favorito de la familia Kurtoz. Una experiencia de sabor inigualable, preparado con los mejores ingredientes para nuestros mejores clientes.",
      img: "https://toriavey.com/images/2014/06/scrambled_eggs_001.jpg",
      modifiers: [
        "/restaurants/tpiauGjqb5yg1bA7qJmm/modifiers/9NtWtu742k2lryIxTd9y",
      ],
      name: "Huevos revueltos",
      variants: [
        {
          name: "chico",
          price: 45,
        },
        {
          name: "mediano",
          price: 48,
        },
        {
          name: "grande",
          price: 50,
        },
      ],
    });
  }

  // postProduct();

  // firebase
  //   .firestore()
  //   .collection("restaurants")
  //   .get()
  //   .then((snapshot) => {
  //     snapshot.forEach((doc) => {
  //       console.log(doc.id, "=>", doc.data());
  //     });
  //   })
  //   .catch((err) => {
  //     console.log("Error getting documents", err);
  //   });

  // GET:
  // let desayunos = [];
  // firebase
  //   .firestore()
  //   .collection("restaurants")
  //   .doc("tpiauGjqb5yg1bA7qJmm")
  //   .collection("categories")
  //   .get()
  //   .then((snapshot) => {
  //     snapshot.forEach((category) => {
  //       if (category.data().name == "desayunos") {
  //         category.data().products.forEach((productReference) => {
  //           productReference.get().then((product) => {
  //             desayunos.push(product.id);
  //             console.log(product.id);
  //           });
  //         });
  //       }
  //     });
  //   })
  //   .catch((err) => {
  //     console.log("Error getting documents", err);
  //   });

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
