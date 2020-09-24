import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import HomeHorizontalScroll from "./HomeHorizontalScroll";
import firebase from "../database/database";

const Home_compo = ({ navigation }) => {
  console.log(
    "Holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  );
  const [categories, setCategories] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    function wait(timeout) {
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    }
    setRefreshing(true);

    wait(500).then(() => {
      setRefreshing(false);
      // setContent(theContent2);
    });
  }, [refreshing]);

  function randomizeArray(array) {
    let copyOfArray = [];
    let states = [];
    for (var i = 0; i < array.length; i++) {
      states.push(false);
      copyOfArray.push(array[i]);
    }
    for (var i = 0; i < array.length; ) {
      let pos = Math.round(Math.random() * array.length);
      if (states[pos] == false) {
        array[pos] = copyOfArray[i];
        states[pos] = true;
        i++;
      }
    }
  }
  console.log(categories.length);
  if (categories.length == 0) {
    console.log("Es la primera vez que se hace esta madreola");
    getCategories("tpiauGjqb5yg1bA7qJmm");
  }
  async function getCategories(restaurantId) {
    await firebase
      .firestore()
      .collection("restaurants")
      .doc(restaurantId)
      .collection("categories")
      .get()
      .then((snapshot) => {
        snapshot.forEach((category) => {
          let cat = {
            id: category.id,
            name: category.data().name,
            products: category.data().products,
          };
          categories.push(cat);
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
    setCategories(
      categories.concat({
        id: "restaurantes disponibles",
        name: "restaurantes disponibles",
      })
    );
    console.log(categories);
  }
  randomizeArray(categories);

  return (
    <SafeAreaView style={styles.SafeAreaView_}>
      <View style={styles.header}>
        <Text style={styles.title}>Inicio</Text>
      </View>
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {categories.map((category) => (
            <HomeHorizontalScroll
              products={category.products}
              id={category.name}
              category={category.name}
            />
          ))}
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
    paddingBottom: "18%",
  },
  header: {
    backgroundColor: "rgb(255,255,255)",
    height: "10%",
    justifyContent: "center",
  },
  title: {
    marginLeft: "12%",
    fontSize: 40,
    fontWeight: "500",
  },
});

export default Home_compo;
