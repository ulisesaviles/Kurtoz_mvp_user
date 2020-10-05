import React from "react";
// import { useNavigation } from "@react-navigation/native";
import StripeCheckout from "expo-stripe-checkout";

const StripeCheckout_ = () => {
  // const navigation = useNavigation();
  function onPaymentSuccess(token) {
    console.log(token);
  }

  function onClose() {
    // navigation.navigate("Restaurant_compo", { id: props.restaurantId });
    console.log("hola mudno");
  }

  return (
    <StripeCheckout
      publicKey="sk_test_4eC39HqLyjWDarjtT1zdp7dc"
      amount={100000}
      imageUrl="https://pbs.twimg.com/profile_images/778378996580888577/MFKh-pNn_400x400.jpg"
      storeName="Stripe Checkout"
      description="Test"
      currency="USD"
      allowRememberMe={false}
      prepopulatedEmail="test@test.com"
      onClose={onClose}
      onPaymentSuccess={onPaymentSuccess}
    />
  );
};

export default StripeCheckout_;
