import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const Help = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "https://ulisesaviles.github.io/Sorting-algorithms/" }}
        style={{ marginTop: 0 }}
      />
      {/* <Text style={{ alignSelf: "center", fontSize: 50 }}>Help</Text> */}
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

export default Help;
