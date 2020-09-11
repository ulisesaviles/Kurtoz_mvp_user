import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import Rating from "./Rating";
import { Entypo } from "@expo/vector-icons";
import FoodMini from "./FoodMini";
import FoodCategory from "./FoodCategory";

const Restaurant_compo = ({ navigation }) => {
  return (
    <View>
      <View style={styles.scrollContainer}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri:
                  "https://d1ralsognjng37.cloudfront.net/3caa881c-8d86-48fe-8801-46c14997ec6d",
              }}
              style={styles.backgroundImage}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.title}>Kurtoz Rolling Bakery Coffe</Text>
            <View style={styles.horizontalDescription}>
              <Text style={styles.category}>Cafetería y Crepas</Text>
              <Rating rating="4.8" />
            </View>
            <View style={styles.horarioContainer}>
              <EvilIcons name="clock" size={16} color="black" />
              <Text style={styles.horario}>Abierto de 10am - 8pm</Text>
            </View>
          </View>
          <View style={styles.locationContainer}>
            <Entypo name="location-pin" size={18} color="grey" />
            <Text style={styles.location}>
              C. Bahía de Ballenas #322, Frac. El Mirador
            </Text>
          </View>
          <View style={styles.menuContainer}>
            <Text style={styles.menu}>Menú</Text>
          </View>
          <FoodCategory />
          <FoodMini />
          <FoodMini />
          <FoodCategory />
          <FoodMini />
          <FoodMini />
          <FoodCategory />
          <FoodMini />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    height: 260,
    backgroundColor: "rgb(0,0,0)",
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 13,
  },
  scrollContainer: {
    backgroundColor: "rgb(240,240,240)",
    height: "100%",
  },
  descriptionContainer: {
    padding: 20,
    height: 140,
    backgroundColor: "rgb(255, 255, 255)",
    marginBottom: 2,
  },
  category: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "300",
  },
  horario: {
    fontSize: 16,
    fontWeight: "300",
    marginHorizontal: 2,
  },
  horarioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  horizontalDescription: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    height: 60,
    marginBottom: 2,
    padding: "5%",
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontWeight: "300",
    fontSize: 16,
  },
  menuContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    padding: 20,
  },
  menu: {
    fontSize: 30,
    fontWeight: "300",
  },
});

export default Restaurant_compo;
