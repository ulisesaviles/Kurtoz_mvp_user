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

const Favourites = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: "center", fontSize: 50 }}>Favourites</Text>
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

export default Favourites;
