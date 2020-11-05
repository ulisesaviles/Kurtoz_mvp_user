import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";

import Perfil_compo from "../components/Perfil_compo";
import Favorites from "../components/Favorites";
import PaymentMethod from "../components/PaymentMethod";
import Help from "../components/Help";
import About from "../components/About";
import Ordenes_compo from "../components/Ordenes_compo";
import Food_compo from "../components/Food_compo";
import StripeContainer from "../components/StripeContainer";
import Terms from "../components/Terms";

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
        <Stack.Screen
          name="Tus Favoritos"
          component={Favorites}
          options={{ headerTransparent: "true", title: "" }}
        />
        <Stack.Screen
          name="Tus Órdenes"
          component={Ordenes_compo}
          options={{ headerTransparent: "true", title: "" }}
        />
        <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethod}
          options={{ headerTransparent: "true", title: "" }}
        />
        <Stack.Screen
          name="Terms"
          component={Terms}
          options={{ headerTransparent: "true", title: "" }}
        />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen
          name="Food_compo"
          component={Food_compo}
          options={{ headerTransparent: "true", title: "" }}
        />
        <Stack.Screen
          name="Stripe"
          component={StripeContainer}
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

export default PerfilScreen;
