import React, { useState } from "react";
import "react-native-gesture-handler";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import firebase from "../database/database";
import Restaurant_medium from "./Restaurant_medium";
import Food_medium from "./Food_medium";
import { Ionicons } from "@expo/vector-icons";

const Buscar_compo = ({ navigation }) => {
  const [doneRequest, setDoneRequest] = useState(false);
  let productsNRestaurants_ = [];
  const [productsNRestaurants, setProductsNRestaurants] = useState([]);
  const [display, setDisplay] = useState([]);
  async function getProductsNRestaurants() {
    if (!doneRequest) {
      setDoneRequest(true);
      await firebase
        .firestore()
        .collection("restaurants")
        .get()
        .then((restaurants) => {
          restaurants.forEach((restaurant) => {
            productsNRestaurants_.push({
              id: restaurant.id,
              name: restaurant.data().name,
              type: "restaurant",
            });
            getProductsFrom(restaurant.id, restaurant.data().name);
          });
        });
    }
  }

  getProductsNRestaurants();

  function componentFor(object) {
    if (object.type == "restaurant") {
      return <Restaurant_medium restaurantId={object.id} />;
    } else if (object.type == "product") {
      return (
        <Food_medium
          id={object.id}
          restaurantId={object.restaurantId}
          restaurantName={object.restaurantName}
        />
      );
    }
  }

  async function getProductsFrom(restaurantId, restaurantName) {
    await firebase
      .firestore()
      .collection("restaurants")
      .doc(restaurantId)
      .collection("products")
      .get()
      .then((products) => {
        products.forEach((product) => {
          if (!product.data().deleted) {
            productsNRestaurants_.push({
              id: product.id,
              name: product.data().name,
              type: "product",
              restaurantId: restaurantId,
              restaurantName: restaurantName,
            });
          }
        });
      });
    setProductsNRestaurants(productsNRestaurants_);
  }
  const [textInput, setTextInput] = useState("");
  var normalize = (function () {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
      to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};

    for (var i = 0, j = from.length; i < j; i++)
      mapping[from.charAt(i)] = to.charAt(i);

    return function (str) {
      var ret = [];
      for (var i = 0, j = str.length; i < j; i++) {
        var c = str.charAt(i);
        if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);
        else ret.push(c);
      }
      return ret.join("");
    };
  })();
  const handleSearch = (text) => {
    setTextInput(text);
    let tempDisplay = [];
    if (text != "") {
      for (let i = 0; i < productsNRestaurants.length; i++) {
        if (
          normalize(
            productsNRestaurants[i].name.substr(0, text.length).toLowerCase()
          ) == normalize(text.toLowerCase())
        ) {
          tempDisplay.push(productsNRestaurants[i]);
        }
      }
    }
    setDisplay(tempDisplay);
  };
  if (display.length > 0) {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.SafeAreaView_}>
          <View style={styles.searchContainer}>
            <View style={styles.searchSimulator}>
              <TextInput
                style={styles.input}
                onChangeText={handleSearch}
                clearButtonMode="while-editing"
              />
              <MaterialIcons name="search" size={24} color="rgb(100,100,100)" />
            </View>
          </View>
          <View style={styles.scrollContainer}>
            <ScrollView>
              <View style={styles.itemsContainer}>
                {display.map((result) => (
                  <View>{componentFor(result)}</View>
                ))}
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  } else if (textInput.length > 0 && display.length == 0) {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.SafeAreaView_}>
          <View style={styles.searchContainer}>
            <View style={styles.searchSimulator}>
              <TextInput
                style={styles.input}
                onChangeText={handleSearch}
                clearButtonMode="while-editing"
              />
              <MaterialIcons name="search" size={24} color="rgb(100,100,100)" />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.notFoundContainer}>
              <Ionicons name="ios-search" size={100} color="rgb(100,100,100)" />
              <Text
                style={styles.notFound}
              >{`No se encontraron resultados para: "${textInput}"`}</Text>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  } else {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.SafeAreaView_}>
          <View style={styles.searchContainer}>
            <View style={styles.searchSimulator}>
              <TextInput
                style={styles.input}
                onChangeText={handleSearch}
                clearButtonMode="always"
                placeholder="Search"
              />
              <MaterialIcons name="search" size={24} color="rgb(100,100,100)" />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.notFoundContainer}>
              <Ionicons name="ios-search" size={100} color="rgb(100,100,100)" />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  SafeAreaView_: {
    marginTop: Platform.OS === "ios" ? 0 : 22,
    backgroundColor: "rgb(255,255,255)",
    height: "100%",
  },
  scrollContainer: {
    height: "100%",
    backgroundColor: "rgb(240,240,240)",
    justifyContent: "space-around",
  },
  searchContainer: {
    height: "10%",
    backgroundColor: "rgb(255,255,255)",
  },
  searchSimulator: {
    marginTop: "2%",
    height: "60%",
    width: "90%",
    backgroundColor: "rgb(230,230,230)",
    alignSelf: "center",
    borderRadius: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  itemsContainer: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  input: {
    height: "100%",
    width: "95%",
    fontWeight: "400",
    fontSize: 18,
  },
  contentContainer: {
    backgroundColor: "rgb(240,240,240)",
    alignItems: "center",
    height: "100%",
  },
  notFoundContainer: {
    marginTop: "30%",
    alignItems: "center",
    width: "60%",
  },
  notFound: {
    fontSize: 18,
    fontWeight: "500",
    color: "rgb(100, 100, 100)",
    textAlign: "center",
  },
});

export default Buscar_compo;
