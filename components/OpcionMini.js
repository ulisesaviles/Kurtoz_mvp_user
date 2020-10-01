import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CheckBox from "react-native-check-box";

function OpcionMini() {
  return (
    <View style={styles.optionContainer}>
      <CheckBox />
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionText}>Crema batida</Text>
        <Text style={styles.optionPrice}>$ 20.00 MXN</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    marginBottom: 2,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionText: {
    fontSize: 20,
    fontWeight: "400",
  },
  optionTextContainer: {
    width: "90%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionPrice: {
    fontWeight: "400",
  },
});

export default OpcionMini;
