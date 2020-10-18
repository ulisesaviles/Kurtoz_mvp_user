import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import React from "react";
import Home from "./HomeScreen";
import BuscarScreen from "./BuscarScreen";
import Ordenes from "./OrdenesScreen";
import PerfilScreen from "./PerfilScreen";
import CartScreen from "./CartScreen";
const Tab = createBottomTabNavigator();
import { MaterialIcons } from "@expo/vector-icons";

export default function Root() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === "Inicio") {
              return <MaterialIcons name={"home"} size={size} color={color} />;
            } else if (route.name === "Buscar") {
              return (
                <MaterialIcons name={"search"} size={size} color={color} />
              );
            } else if (route.name === "Cart") {
              return (
                <MaterialIcons
                  name={"shopping-cart"}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === "Cuenta") {
              return (
                <MaterialIcons
                  name={"account-circle"}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === "Órdenes") {
              return (
                <MaterialIcons name={"receipt"} size={size} color={color} />
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: "black",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Inicio" component={Home} />
        <Tab.Screen name="Buscar" component={BuscarScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Órdenes" component={Ordenes} />
        <Tab.Screen name="Cuenta" component={PerfilScreen} />
      </Tab.Navigator>
    </>
  );
}

// const styles = StyleSheet.create({});
