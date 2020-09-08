import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";

import Ordenes_compo from "../components/Ordenes_compo";
import Restaurant_compo from "../components/Restaurant_compo";
import Food_compo from "../components/Food_compo";
const Stack = createStackNavigator();

const BuscarScreen = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="Ordenes"
          component={Ordenes_compo}
          options={{ headerTransparent: "true", title: "" }}
        />
        <Stack.Screen
          name="Restaurant_compo"
          component={Restaurant_compo}
          options={{ headerTransparent: "true", title: "" }}
        />
        <Stack.Screen
          name="Food_compo"
          component={Food_compo}
          options={{ headerTransparent: "true", title: "" }}
        />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "rgb(240,240,240)",
  },
});

export default BuscarScreen;
