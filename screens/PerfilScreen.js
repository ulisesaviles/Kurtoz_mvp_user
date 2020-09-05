import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";

import Perfil_compo from "../components/Perfil_compo";
import EditAccount from "../components/EditAccount";
import Favourites from "../components/Favourites";
import PaymentMethod from "../components/PaymentMethod";
import Help from "../components/Help";
import About from "../components/About";

const Stack = createStackNavigator();

const PerfilScreen = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="Perfil"
          component={Perfil_compo}
          options={{ headerTransparent: "true", title: "" }}
        />
        <Stack.Screen name="EditAccount" component={EditAccount} />
        <Stack.Screen name="Favourites" component={Favourites} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="About" component={About} />
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

export default PerfilScreen;
