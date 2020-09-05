import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import DisplayMenu from "../components/DisplayMenu";
import Buscar_compo from "../components/Buscar_compo";
const Stack = createStackNavigator();

const BuscarScreen = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="Buscar"
          component={Buscar_compo}
          options={{ headerTransparent: "true", title: "" }}
        />
        <Stack.Screen name="DisplayMenu" component={DisplayMenu} />
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
