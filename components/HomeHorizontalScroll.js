import React from "react";
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
import Restaurant_medium from "./Restaurant_medium";

const HomeHorizontalScroll = ({ navigation }) => {
  return (
    <View style={styles.HScrollContainer}>
      <Text style={styles.HScrollTitle}>Recomendaciones: </Text>
      <ScrollView horizontal>
        <Restaurant_medium />
        <Restaurant_medium />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  HScrollContainer: {
    marginTop: "5%",
    backgroundColor: "rgb(245, 245, 245)",
  },
  HScrollTitle: {
    fontSize: 25,
    marginLeft: "5%",
    marginBottom: "2%",
    fontWeight: "500",
    color: "rgb(40,40,40)",
  },
});

export default HomeHorizontalScroll;
