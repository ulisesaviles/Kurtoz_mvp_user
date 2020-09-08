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
  ScrollView,
} from "react-native";
import OpcionMini from "./OpcionMini";

const Food_compo = ({ navigation }) => {
  return (
    <View>
      <View style={styles.scrollContainer}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image
              source={require("../Examples/kurtoz_nieve.jpg")}
              style={styles.backgroundImage}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.title}>Nieve de Vainilla</Text>
            <Text style={styles.description}>
              Nieve de Vainilla en cono de galleta de chocolate suizo super mega
              rico sí señor.
            </Text>
          </View>
          <View style={styles.opcionesContainer}>
            <Text style={styles.opciones}>Opciones</Text>
          </View>
          <OpcionMini />
          <OpcionMini />
          <OpcionMini />
          <OpcionMini />
          <OpcionMini />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Carrito");
            }}
          >
            <View style={styles.addToCartBtn}>
              <Text style={styles.addToCart}>Add to cart</Text>
            </View>
          </TouchableOpacity>
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
    fontWeight: "400",
    marginBottom: 13,
  },
  scrollContainer: {
    backgroundColor: "rgb(240,240,240)",
    height: "100%",
  },
  descriptionContainer: {
    padding: 20,
    backgroundColor: "rgb(255, 255, 255)",
    marginBottom: 2,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "300",
  },
  opcionesContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    padding: 20,
  },
  opciones: {
    fontSize: 30,
    fontWeight: "300",
  },
  addToCartBtn: {
    backgroundColor: "rgb(0,0,0)",
    padding: 10,
    width: "95%",
    // borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
  },
  addToCart: {
    color: "rgb(255, 255, 255)",
    fontSize: 22,
    fontWeight: "600",
  },
});

export default Food_compo;
