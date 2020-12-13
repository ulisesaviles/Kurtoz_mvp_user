import React, { useState } from "react";
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import firebase from "../database/database";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const SignUp = ({ navigation }) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  async function storeData(value) {
    try {
      await AsyncStorage.setItem("userData", value);
    } catch (e) {
      console.log(e);
    }
  }
  const [check, setCheck] = useState(-1);

  async function handlePress() {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      if (name.length < 6) {
        setError("Su nombre debe contener al menos 6 caracteres");
      } else if (name.length > 20) {
        setError("Su nombre debe contener menos de 20 caracteres");
      } else if (password.length < 5) {
        setError("La contraseña debe contener al menos 5 caracteres");
      } else if (check == -1) {
        setError(
          "Debes de aceptar los términos y condiciones para crear una cuenta"
        );
      } else {
        let validEmail = true;
        await firebase
          .firestore()
          .collection("users")
          .get()
          .then((users) => {
            users.forEach((user) => {
              if (user.data().email == email) {
                setError(
                  "El correo ingresado ya está asociado a una cuenta existente."
                );
                validEmail = false;
              }
            });
          });
        if (validEmail) {
          let user = {
            name: name,
            email: email,
            password: password,
            cart: {
              items: [],
              restaurantId: "",
            },
            paymentMethods: {
              data: [],
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
      }
    } else {
      setError("Ingresa una dirección de correo válida");
    }
  }

  function componentFor(value) {
    if (value == -1) {
      return (
        <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
      );
    } else {
      return <MaterialIcons name="check-box" size={24} color="black" />;
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.inputTitle}>Nombre</Text>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={(text) => {
                setName(text);
              }}
              style={styles.input}
              placeholder="nombre"
              clearButtonMode="while-editing"
              autoCapitalize="words"
            />
          </View>
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
          <View style={styles.terminosContainer}>
            <TouchableOpacity
              onPress={() => {
                setCheck(check * -1);
              }}
            >
              <View style={styles.checkContainer}>{componentFor(check)}</View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.termsBtn}
              onPress={() => {
                navigation.navigate("Terms");
              }}
            >
              <View>
                <Text style={styles.heLeido}>He leído y acepto los</Text>
                <Text style={styles.terms}>términos y condiciones</Text>
              </View>
              <Ionicons
                name="ios-arrow-forward"
                size={24}
                color="black"
                style={styles.btnArrow}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.btnsContainer}>
            <TouchableOpacity onPress={handlePress}>
              <View style={styles.signUpContainer}>
                <Text style={styles.btnTitle}>Crear cuenta</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.error}>{error}</Text>
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
  terminosContainer: {
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "center",
  },
  heLeido: {
    marginLeft: "5%",
  },
  terms: {
    marginLeft: "5%",
    color: "rgb(0,0,255)",
    textDecorationLine: "underline",
  },
  error: {
    color: "rgb(200, 0, 0)",
    fontWeight: "500",
    alignSelf: "center",
    marginTop: "4%",
    textAlign: "center",
  },
  termsBtn: {
    flexDirection: "row",
  },
  btnArrow: {
    marginLeft: "5%",
  },
});

export default SignUp;
