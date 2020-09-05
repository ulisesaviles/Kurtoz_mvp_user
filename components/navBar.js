import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";

const NavBAr = ({ navigation }) => {
  return (
    <View style={styles.NavBar}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <View style={styles.iconContainer}>
          <Image
            source={require("../assets/home_icon.png")}
            style={styles.icon}
          ></Image>
          <Text style={styles.iconText}>Inicio</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Buscar");
        }}
      >
        <View style={styles.iconContainer}>
          <Image
            source={require("../assets/buscar.png")}
            style={styles.icon}
          ></Image>
          <Text style={styles.iconText}>Buscar</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Ordenes");
        }}
      >
        <View style={styles.iconContainer}>
          <Image
            source={require("../assets/ticket.png")}
            style={styles.icon}
          ></Image>
          <Text style={styles.iconText}>Órdenes</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Perfil");
        }}
      >
        <View style={styles.iconContainer}>
          <Image
            source={require("../assets/profile.png")}
            style={styles.icon}
          ></Image>
          <Text style={styles.iconText}>Perfil</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
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
