import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import GoBackBtn from "./GoBackBtn";
import { WebView } from "react-native-webview";

const Map = ({ route }) => {
  function createLink() {
    let link = "https://www.google.com/maps/search/?api=1&query=";
    for (let i = 0; i < route.params.restaurantName.length; i++) {
      if (route.params.restaurantName.substring(i, i + 1) != " ") {
        link += route.params.restaurantName.substring(i, i + 1);
      } else {
        link += "+";
      }
    }
    link += "+";
    for (let i = 0; i < route.params.address.length; i++) {
      if (route.params.address.substring(i, i + 1) != " ") {
        link += route.params.address.substring(i, i + 1);
      } else {
        link += "+";
      }
    }
    return link;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.goBackContainer}>
          <GoBackBtn style={styles.goBack} />
        </View>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.header}>{route.params.restaurantName}</Text>
        </View>
      </View>
      <WebView
        source={{
          uri: createLink(),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "rgb(240,240,240)",
  },
  termsContainer: {
    marginTop: "2%",
    marginBottom: "30%",
  },
  termTitle: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 8,
  },
  termCategoryContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    paddingHorizontal: "8%",
    paddingVertical: 20,
    marginBottom: 5,
  },
  bulletContainer: {
    flexDirection: "row",
    marginBottom: 4,
    paddingRight: "5%",
  },
  bullet: {
    fontWeight: "900",
    marginHorizontal: "2%",
  },
  headerContainer: {
    flexDirection: "row",
    height: "12%",
    borderBottomColor: "rgb(100,100,100)",
    backgroundColor: "rgb(255,255,255)",
    marginBottom: 1,
  },
  goBackContainer: {
    height: "100%",
    paddingTop: "12%",
    paddingLeft: "5%",
    width: "15%",
  },
  headerTitleContainer: {
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: "15%",
    fontSize: 25,
    fontWeight: "600",
  },
});

export default Map;
