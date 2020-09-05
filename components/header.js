import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";

const NavBAr = () => {
  return <View style={styles.NavBar}></View>;
};

const styles = StyleSheet.create({
  NavBar: {
    backgroundColor: "rgb(255,255,255)",
    height: "13%",
    width: "100%",
    alignSelf: "flex-end",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  iconText: {
    alignSelf: "center",
  },
});

export default NavBAr;
