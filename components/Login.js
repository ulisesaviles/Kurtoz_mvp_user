import React, { useState } from "react";
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import firebase from "../database/database";
import AsyncStorage from "@react-native-community/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function storeData(value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("userData", jsonValue);
    } catch (e) {
      console.log(e);
    }
  }

  async function signIn() {
    await firebase
      .firestore()
      .collection("users")
      .get()
      .then((users) => {
        users.forEach(async (user) => {
          if (user.data().email == email && user.data().password == password) {
            await storeData({
              email: email,
              name: user.data().name,
              id: user.id,
            });
            navigation.navigate("Root");
          } else {
            setError("El usuario y/o la contraseña no coindiden.");
          }
        });
      });
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.inputTitle}>Correo</Text>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={(text) => {
                setEmail(text.toLowerCase());
              }}
              style={styles.input}
              placeholder="alguien@example.com"
              clearButtonMode="while-editing"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <Text style={styles.error}>{error}</Text>
          <Text style={styles.inputTitle}>Contraseña</Text>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={(text) => {
                setPassword(text);
              }}
              style={styles.input}
              placeholder="contraseña"
              clearButtonMode="while-editing"
              secureTextEntry="true"
            />
          </View>
          <Text style={styles.error}>{error}</Text>
          <View style={styles.btnsContainer}>
            <TouchableOpacity onPress={signIn}>
              <View style={styles.signInContainer}>
                <Text style={styles.btnTitle}>Iniciar sesión</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  input: {
    fontSize: 18,
    height: 18,
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
  btnTitle: {
    color: "rgb(255,255,255)",
    fontSize: 25,
    fontWeight: "600",
  },
  btnsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    marginBottom: 30,
    color: "rgb(255,0,0)",
    alignSelf: "center",
    fontWeight: "500",
    marginTop: "2%",
  },
});

export default Login;
