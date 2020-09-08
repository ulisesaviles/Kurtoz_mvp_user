import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CheckBox from "react-native-check-box";

function OpcionMini() {
  return (
    <View style={styles.container}>
      <CheckBox />
      {/* https://nicedoc.io/crazycodeboy/react-native-check-box */}
      <View style={styles.textContainer}>
        <Text style={styles.opcion}>Crema batida</Text>
        <Text style={styles.Price}>$ 20.00 MXN</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    marginBottom: 2,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  opcion: {
    fontSize: 20,
    fontWeight: "400",
  },
  textContainer: {
    width: "90%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Price: {
    fontWeight: "400",
  },
});

export default OpcionMini;
