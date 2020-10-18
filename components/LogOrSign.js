import React, { useState } from "react";
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const LogOrSign = ({ navigation }) => {
  const [gotUser, setGotUser] = useState(false);
  let userData = {};
  getUser();
  async function storeData(value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("userData", jsonValue);
    } catch (e) {
      console.log(e);
    }
  }
  async function getUser() {
    if (!gotUser) {
      setGotUser(true);
      try {
        let value = await AsyncStorage.getItem("userData");
        userData = JSON.parse(value);
        console.log(userData.id);
        if (userData.id.length > 0) {
          navigation.navigate("Root");
        }
      } catch (e) {
        storeData({ name: "", email: "", id: "" });
      }
    }
  }

  return (
    <View style={styles.contentContainer}>
      <View>
        <View style={styles.btnsContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <View style={styles.signUpContainer}>
              <Text style={styles.singUp}>Iniciar sesión</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <View style={styles.signInContainer}>
              <Text style={styles.singIn}>Crear cuenta</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    height: "100%",
    backgroundColor: "rgb(255, 255, 255)",
    justifyContent: "space-around",
    padding: "15%",
  },
  inputContainer: {
    backgroundColor: "rgb(230,230,230)",
    width: "100%",
    height: 40,
    borderRadius: 20,
    marginBottom: 30,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  input: {
    fontSize: 18,
  },
  inputTitle: {
    marginBottom: "4%",
    fontWeight: "500",
    fontSize: 18,
  },
  signInContainer: {
    backgroundColor: "rgb(0,0,0)",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 20,
    width: "80%",
  },
  signUpContainer: {
    backgroundColor: "rgb(230,230,230)",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 20,
    width: "80%",
  },
  singIn: {
    color: "rgb(255,255,255)",
    fontSize: 25,
    fontWeight: "600",
  },
  btnsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  singUp: {
    fontSize: 25,
    fontWeight: "400",
  },
});

export default LogOrSign;
