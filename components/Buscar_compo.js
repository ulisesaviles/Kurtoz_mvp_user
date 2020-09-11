import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import RestaurantLogo_touchable from "./RestaurantLogo_touchable";

const Buscar_compo = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.SafeAreaView_}>
      <View style={styles.searchContainer}>
        <View style={styles.searchSimulator} />
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView>
          <View style={styles.itemsContainer}>
            <RestaurantLogo_touchable />
            <RestaurantLogo_touchable />
            <RestaurantLogo_touchable />
            <RestaurantLogo_touchable />
            <RestaurantLogo_touchable />
            <RestaurantLogo_touchable />
          </View>
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
  },
  itemsContainer: {
    alignContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Buscar_compo;
