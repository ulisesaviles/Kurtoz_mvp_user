import React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import Food_medium from "./Food_medium";

const Favorites = () => {
  return (
    <SafeAreaView style={styles.SafeAreaView_}>
      <View style={styles.header}>
        <Text style={styles.title}>Tus Favoritos</Text>
      </View>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.itemsContainer}>
            <Food_medium />
            <Food_medium />
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
  container: {
    height: "100%",
    backgroundColor: "rgb(240,240,240)",
    justifyContent: "space-around",
    // alignItems: "center",
  },
  header: {
    backgroundColor: "rgb(255,255,255)",
    height: "7%",
    justifyContent: "center",
  },
  HScrollContainer: {
    marginTop: "5%",
    backgroundColor: "rgb(245, 245, 245)",
  },
  title: {
    marginLeft: "25%",
    fontSize: 35,
    fontWeight: "500",
  },
  HScrollTitle: {
    fontSize: 25,
    marginLeft: "5%",
    marginBottom: "2%",
    fontWeight: "500",
  },
  itemsContainer: {
    alignItems: "center",
  },
});

export default Favorites;
