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
} from "react-native";

const DisplayMenu = ({ navigation }, RestaurantName) => {
  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: "center", fontSize: 50 }}>
        Hola soy el Menú
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "rgb(240,240,240)",
    justifyContent: "space-around",
  },
});

export default DisplayMenu;
