import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import StripeCheckout from "react-native-stripe-checkout-webview";
import "react-native-gesture-handler";

const Help = ({ navigation }) => {
  const CHECKOUT_SESSION_ID = {
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel",
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: "<h1>Holaaaaa<h1>",
        }}
        originWhitelist={["*"]}
        style={{ marginTop: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "rgb(240,240,240)",
    justifyContent: "space-around",
  },
});

export default Help;
