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
import Restaurant_medium from "./Restaurant_medium";

const Home_compo = () => {
  return (
    <SafeAreaView style={styles.SafeAreaView_}>
      <View style={styles.header}>
        <Text style={styles.title}>Inicio</Text>
      </View>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.HScrollContainer}>
            <Text style={styles.HScrollTitle}>Recomendaciones: </Text>
            <ScrollView horizontal>
              <Restaurant_medium />
              <Restaurant_medium />
            </ScrollView>
          </View>
          <View style={styles.HScrollContainer}>
            <Text style={styles.HScrollTitle}>Recomendaciones: </Text>
            <ScrollView horizontal>
              <Restaurant_medium />
              <Restaurant_medium />
            </ScrollView>
          </View>
          <View style={styles.HScrollContainer}>
            <Text style={styles.HScrollTitle}>Recomendaciones: </Text>
            <ScrollView horizontal>
              <Restaurant_medium />
              <Restaurant_medium />
            </ScrollView>
          </View>
          <View style={styles.HScrollContainer}>
            <Text style={styles.HScrollTitle}>Recomendaciones: </Text>
            <ScrollView horizontal>
              <Restaurant_medium />
              <Restaurant_medium />
            </ScrollView>
          </View>
          <View style={styles.HScrollContainer}>
            <Text style={styles.HScrollTitle}>Recomendaciones: </Text>
            <ScrollView horizontal>
              <Restaurant_medium />
              <Restaurant_medium />
            </ScrollView>
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
    paddingBottom: "18%",
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
    color: "rgb(40,40,40)",
  },
});

export default Home_compo;
