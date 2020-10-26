import React, { useState } from "react";
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import firebase from "../database/database";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  async function storeData(value) {
    console.log(value);
    try {
      // const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("userData", value);
    } catch (e) {
      console.log(e);
    }
  }

  async function handlePress() {
    let user = {
      name: name,
      email: email,
      password: password,
      cart: {
        items: [],
        restaurantId: "",
      },
    };
    await firebase.firestore().collection("users").add(user);
    await firebase
      .firestore()
      .collection("users")
      .get()
      .then((users) => {
        users.forEach(async (user) => {
          if (user.data().email == email && user.data().name == name) {
            storeData(
              JSON.stringify({
                email: email,
                name: user.data().name,
                id: user.id,
              })
            );
            await axios({
              method: "post",
              url:
                "https://us-central1-food-delivery-app-86ccd.cloudfunctions.net/createStripeUser",
              data: {
                id: user.id,
              },
            }).then((response) => {
              console.log(response);
            });
          }
        });
      });
    navigation.navigate("Root");
  }

  return (
    <View style={styles.contentContainer}>
      <View>
        <Text style={styles.inputTitle}>Nombre</Text>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(text) => {
              setName(text);
            }}
            style={styles.input}
          />
        </View>
        <Text style={styles.inputTitle}>Correo</Text>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(text) => {
              setEmail(text);
            }}
            style={styles.input}
          />
        </View>
        <Text style={styles.inputTitle}>Contraseña</Text>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(text) => {
              setPassword(text);
            }}
            style={styles.input}
          />
        </View>
        <View style={styles.btnsContainer}>
          <TouchableOpacity onPress={handlePress}>
            <View style={styles.signUpContainer}>
              <Text style={styles.btnTitle}>Crear cuenta</Text>
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
    height: 18,
  },
  inputTitle: {
    marginBottom: "4%",
    fontWeight: "500",
    fontSize: 18,
  },
  signUpContainer: {
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
});

export default SignUp;
