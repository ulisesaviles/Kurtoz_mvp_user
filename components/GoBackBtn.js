import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

function GoBackBtn() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <View style={styles.container}>
        <MaterialIcons name="arrow-back" size={30} color="black" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    marginHorizontal: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    height: 30,
    borderRadius: 10,
    paddingHorizontal: 5,
    width: 40,
  },
  atras: {
    fontSize: 30,
    alignSelf: "center",
  },
});

export default GoBackBtn;
