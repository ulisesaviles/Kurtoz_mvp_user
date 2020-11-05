import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

function TarjetaMini(props) {
  const navigation = useNavigation();
  console.log(props);

  function cardBrand() {
    if (props.brand == "mastercard") {
      return (
        <Image
          source={require("../assets/masterCard_icon.png")}
          style={styles.photo}
        />
      );
    } else if (props.brand == "visa") {
      return (
        <Image
          source={require("../assets/visa_icon.png")}
          style={styles.photo}
        />
      );
    } else if (props.brand == "amex") {
      return (
        <Image
          source={require("../assets/americanExpress_icon.png")}
          style={styles.photo}
        />
      );
    } else {
      return (
        <SimpleLineIcons
          name="credit-card"
          size={35}
          style={{ marginHorizontal: "3%" }}
          color="black"
        />
      );
    }
  }

  return (
    // <TouchableOpacity>
    <View style={styles.superContainer}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          {cardBrand()}
          <Text
            style={styles.cardNumber}
          >{`••••  ••••  ••••  ${props.last4}`}</Text>
        </View>
        {/* <MaterialIcons
            name="chevron-right"
            size={24}
            color="rgb(100,100,100)"
          /> */}
      </View>
      <View style={styles.separador} />
    </View>
    // </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  description: {
    width: "100%",
    fontWeight: "300",
    marginBottom: "4%",
  },
  FoodName: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: "5%",
  },
  textContainer: {
    width: "60%",
    height: "100%",
  },
  Price: {
    fontWeight: "400",
  },
  separador: {
    height: 1,
    width: "80%",
    backgroundColor: "rgb(240,240,240)",
  },
  superContainer: {
    alignItems: "center",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardNumber: {
    fontSize: 18,
    marginLeft: "5%",
    fontWeight: "400",
  },
});

export default TarjetaMini;
