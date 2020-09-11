import React from "react";
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
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
              source={{
                uri:
                  "https://scontent.ftij1-1.fna.fbcdn.net/v/t1.0-9/27858576_172626690015090_2321536906365458293_n.jpg?_nc_cat=106&_nc_sid=8bfeb9&_nc_eui2=AeE6-6KCW8trFvQxazSM4QEVvUI5v6I1YP29Qjm_ojVg_YDtO5jdy0dbUu7-EY1U01jsEj6eEsAMtg1vNlDi0orZ&_nc_ohc=DCKP55MdsHUAX9BGKN1&_nc_ht=scontent.ftij1-1.fna&oh=1269804a0024db38e16ba82f993fb37a&oe=5F814571",
              }}
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
