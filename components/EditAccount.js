import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";

const EditAccount = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: "center", fontSize: 50 }}>Edit account</Text>
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

export default EditAccount;
