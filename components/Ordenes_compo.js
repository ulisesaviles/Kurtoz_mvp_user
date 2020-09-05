import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from "react-native";

const Ordenes_compo = () => {
  return (
    <SafeAreaView style={styles.SafeAreaView_}>
      <View style={styles.container}>
        <Text style={{ alignSelf: "center", fontSize: 50 }}>Órdenes</Text>
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
  },
});

export default Ordenes_compo;
