import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Perfil = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.SafeAreaView_}>
      <View style={styles.header} />
      <View style={styles.scrollContainer}>
        <ScrollView>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditAccount");
            }}
          >
            <View style={styles.profileContainer}>
              <View style={styles.ppContainer}>
                <Image
                  source={require("../Examples/ProfilePhoto.jpg")}
                  style={styles.pp}
                />
              </View>
              <View style={styles.profileTextContainer}>
                <Text style={styles.userName}>Ulises Aviles</Text>
                <Text style={styles.editAccount}>Editar Perfil</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Tus Favoritos");
            }}
          >
            <View style={styles.settingContainer}>
              <MaterialIcons
                style={styles.settingLogo}
                name={"favorite"}
                size={25}
                color={"rgb(0,0,0)"}
              />
              <Text style={styles.settingTitle}>Tus Favoritos</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Tus Órdenes");
            }}
          >
            <View style={styles.settingContainer}>
              <MaterialIcons
                style={styles.settingLogo}
                name={"receipt"}
                size={25}
                color={"rgb(0,0,0)"}
              />
              <Text style={styles.settingTitle}>Tus Órdenes</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PaymentMethod");
            }}
          >
            <View style={styles.settingContainer}>
              <MaterialIcons
                style={styles.settingLogo}
                name={"payment"}
                size={25}
                color={"rgb(0,0,0)"}
              />
              <Text style={styles.settingTitle}>Métodos de pago</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Help");
            }}
          >
            <View style={styles.settingContainer}>
              <MaterialIcons
                style={styles.settingLogo}
                name={"help"}
                size={25}
                color={"rgb(0,0,0)"}
              />
              <Text style={styles.settingTitle}>Ayuda</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("About");
            }}
          >
            <View style={styles.settingContainer}>
              <MaterialIcons
                style={styles.settingLogo}
                name={"code"}
                size={25}
                color={"rgb(0,0,0)"}
              />
              <Text style={styles.settingTitle}>Acerca del app</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView_: {
    marginTop: Platform.OS === "ios" ? 0 : 22,
    backgroundColor: "rgb(255,255,255)",
    height: "100%",
  },
  header: {
    height: "6%",
    width: "100%",
  },
  scrollContainer: {
    height: "100%",
    backgroundColor: "rgb(240,240,240)",
    justifyContent: "space-around",
  },
  profileContainer: {
    marginTop: "2%",
    marginBottom: "0.5%",
    backgroundColor: "rgb(255,255,255)",
    flexDirection: "row",
  },
  pp: {
    height: 80,
    width: 80,
    borderRadius: 50,
    margin: "8%",
  },
  profileTextContainer: {
    justifyContent: "center",
    margin: "-10%",
  },
  userName: {
    fontSize: 30,
    marginBottom: "2%",
  },
  editAccount: {
    color: "rgb(100,100,100)",
    fontSize: 15,
    fontWeight: "500",
  },
  settingContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    flexDirection: "row",
  },
  settingLogo: {
    margin: "5%",
  },
  settingTitle: {
    fontSize: 20,
    alignSelf: "center",
  },
});

export default Perfil;
