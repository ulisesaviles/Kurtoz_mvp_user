import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import Root from "./screens/RootScreen";
import LogOrSign from "./components/LogOrSign";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Terms from "./components/Terms";

export default function App() {
  const [gotUser, setGotUser] = useState(false);
  let userData = {};
  getUser();
  async function getUser() {
    if (!gotUser) {
      setGotUser(true);
      try {
        let value = await AsyncStorage.getItem("userData");
        userData = JSON.parse(value);
        console.log(userData.id);
      } catch (e) {
        storeData({ name: "", email: "", id: "" });
      }
    }
  }

  async function storeData(value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("userData", jsonValue);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LogOrSign"
            component={LogOrSign}
            options={{
              headerTransparent: "true",
              title: "",
            }}
          />
          <Stack.Screen
            name="Root"
            component={Root}
            options={{
              headerTransparent: "true",
              title: "",
              headerLeft: null,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerTransparent: "true",
              title: "",
            }}
          />
          <Stack.Screen
            name="Terms"
            component={Terms}
            options={{
              // headerTransparent: "true",
              title: "Términos y condiciones",
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTransparent: "true",
              title: "",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style={"dark"} />
    </>
  );
}
