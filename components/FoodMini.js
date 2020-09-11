import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";

function FoodMini() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Food_compo");
      }}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.FoodName}>Nieve de Vainilla</Text>
          <Text style={styles.description}>
            Nieve de Vainilla en cono de galleta de chocolate suizo super mega
            rico sí señor.
          </Text>
          <Text style={styles.Price}>$ 120.00 MXN</Text>
        </View>
        <Image
          source={{
            uri:
              "https://scontent.ftij1-1.fna.fbcdn.net/v/t1.0-9/27858576_172626690015090_2321536906365458293_n.jpg?_nc_cat=106&_nc_sid=8bfeb9&_nc_eui2=AeE6-6KCW8trFvQxazSM4QEVvUI5v6I1YP29Qjm_ojVg_YDtO5jdy0dbUu7-EY1U01jsEj6eEsAMtg1vNlDi0orZ&_nc_ohc=DCKP55MdsHUAX9BGKN1&_nc_ht=scontent.ftij1-1.fna&oh=1269804a0024db38e16ba82f993fb37a&oe=5F814571",
          }}
          style={styles.photo}
        />
      </View>
    </TouchableOpacity>
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
  photo: {
    width: 100,
    height: 100,
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
});

export default FoodMini;
