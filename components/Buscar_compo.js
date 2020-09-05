import React from "react";
import "react-native-gesture-handler";
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

const Buscar_compo = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.SafeAreaView_}>
      <View style={styles.searchContainer}>
        <View style={styles.searchSimulator} />
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView>
          <View style={styles.itemsContainer}>
            <View style={styles.logoContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("DisplayMenu", "Kurtoz");
                }}
              >
                <Image
                  source={require("../Examples/KurtozLogo.jpg")}
                  style={styles.restaurantLogo}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.logoContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("DisplayMenu", "Kurtoz");
                }}
              >
                <Image
                  source={require("../Examples/KurtozLogo.jpg")}
                  style={styles.restaurantLogo}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.logoContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("DisplayMenu", "Kurtoz");
                }}
              >
                <Image
                  source={require("../Examples/KurtozLogo.jpg")}
                  style={styles.restaurantLogo}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.logoContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("DisplayMenu", "Kurtoz");
                }}
              >
                <Image
                  source={require("../Examples/KurtozLogo.jpg")}
                  style={styles.restaurantLogo}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.logoContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("DisplayMenu", "Kurtoz");
                }}
              >
                <Image
                  source={require("../Examples/KurtozLogo.jpg")}
                  style={styles.restaurantLogo}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.logoContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("DisplayMenu", "Kurtoz");
                }}
              >
                <Image
                  source={require("../Examples/KurtozLogo.jpg")}
                  style={styles.restaurantLogo}
                />
              </TouchableOpacity>
            </View>
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
  restaurantLogo: {
    height: 157,
    width: 157,
    borderRadius: 15,
  },
  logoContainer: {
    margin: "4%",
  },
});

export default Buscar_compo;
