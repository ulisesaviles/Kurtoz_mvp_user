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
import HomeHorizontalScroll from "./HomeHorizontalScroll";

const Home_compo = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.SafeAreaView_}>
      <View style={styles.header}>
        <Text style={styles.title}>Inicio</Text>
      </View>
      <View style={styles.container}>
        <ScrollView>
          <HomeHorizontalScroll />
          <HomeHorizontalScroll />
          <HomeHorizontalScroll />
          <HomeHorizontalScroll />
          <HomeHorizontalScroll />
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
