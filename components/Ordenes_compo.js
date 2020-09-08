import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Food_medium from "./Food_medium";

const Ordenes_compo = () => {
  return (
    <SafeAreaView style={styles.SafeAreaView_}>
      <View style={styles.header}>
        <Text style={styles.title}>Órdenes</Text>
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
    height: "10%",
    justifyContent: "center",
  },
  HScrollContainer: {
    marginTop: "5%",
    backgroundColor: "rgb(245, 245, 245)",
  },
  title: {
    marginLeft: "12%",
    fontSize: 40,
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

export default Ordenes_compo;
