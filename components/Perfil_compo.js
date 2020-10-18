import React, { useState } from "react";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

const Perfil = ({ navigation, route }) => {
  const [userName, setUserName] = useState("Iniciar Sesión");
  const [editAccount, setEdit] = useState("Editar perfil");
  let userData = {};
  const [gotUser, setGotUser] = useState(false);

  async function getUser() {
    if (!gotUser) {
      setGotUser(true);
      try {
        userData = JSON.parse(await AsyncStorage.getItem("userData"));
        setUserName(userData.name);
      } catch (e) {
        console.log(e);
      }
    }
  }
  getUser();
  async function storeData(value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("userData", jsonValue);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <SafeAreaView style={styles.SafeAreaView_}>
      <View style={styles.header} />
      <View style={styles.scrollContainer}>
        <ScrollView>
          <TouchableOpacity>
            <View style={styles.profileContainer}>
              <View style={styles.ppContainer}>
                <MaterialIcons
                  name={"account-circle"}
                  size={60}
                  color={"black"}
                  style={styles.pp}
                />
              </View>
              <View style={styles.profileTextContainer}>
                <Text style={styles.userName}>{userName}</Text>
                <Text style={styles.editAccount}>{editAccount}</Text>
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
          <TouchableOpacity
            onPress={async () => {
              navigation.navigate("LogOrSign");
              await storeData({
                email: "",
                name: "",
                id: "",
              });
            }}
          >
            <View style={styles.settingContainer}>
              <MaterialCommunityIcons
                name="logout"
                size={24}
                color="black"
                style={styles.settingLogo}
              />
              <Text style={styles.settingTitle}>Cerrar sesión</Text>
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
    height: 60,
    width: 60,
    borderRadius: 50,
    margin: "8%",
  },
  profileTextContainer: {
    // backgroundColor: "red",
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
