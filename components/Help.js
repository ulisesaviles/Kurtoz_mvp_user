import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import "react-native-gesture-handler";

const Help = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <WebView
        // source={{
        //   html: `<head>
        //     <meta charset="utf-8" />
        //     <title>Stripe Card Payments</title>
        //     <meta name="description" content="Payments handler" />
        //     <meta name="viewport" content="width=device-width, initial-scale=1" />
        //     <script src="https://js.stripe.com/v3/"></script>
        //     <style>
        //       body {
        //         padding: 5vw;
        //         margin: 0;
        //       }

        //       .StripeElement {
        //         box-sizing: border-box;

        //         height: 40px;

        //         padding: 10px 12px;

        //         border: 1px solid transparent;
        //         border-radius: 4px;
        //         background-color: white;

        //         box-shadow: 0 1px 3px 0 #e6ebf1;
        //         -webkit-transition: box-shadow 150ms ease;
        //         transition: box-shadow 150ms ease;
        //       }

        //       .StripeElement--focus {
        //         box-shadow: 0 1px 3px 0 #cfd7df;
        //       }

        //       .StripeElement--invalid {
        //         border-color: #fa755a;
        //       }

        //       .StripeElement--webkit-autofill {
        //         background-color: #fefde5 !important;
        //       }

        //       .label {
        //         font-size: 1em;
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-weight: 600;
        //         color: rgb(119, 119, 119);
        //       }

        //       .mini-title-container {
        //         padding-bottom: 15px;
        //       }

        //       .submit-btn {
        //         background-color: rgb(0, 0, 0);
        //         color: rgb(255, 255, 255);
        //         font-weight: 600;
        //         border-radius: 10px;
        //         font-size: 20px;
        //         width: 90vw;
        //         margin-top: 8vw;
        //         padding: 2vw;
        //       }

        //       .stripe-logo {
        //         width: 62.5px;
        //         height: 25px;
        //       }

        //       .powered-by-container {
        //         display: inline-flex;
        //         align-items: center;
        //         font-family: Arial, Helvetica, sans-serif;
        //         color: rgb(119, 119, 119);
        //       }

        //       .extra-info-container {
        //         text-align: center;
        //       }

        //       .errors {
        //         font-family: Arial, Helvetica, sans-serif;
        //         color: rgb(255, 0, 0);
        //         font-size: 0.9em;
        //         margin-top: 5px;
        //       }

        //       .title {
        //         text-align: center;
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-weight: 700;
        //         margin-top: 5vh;
        //         margin-bottom: 5vh;
        //         font-size: 2em;
        //       }
        //     </style>
        //   </head>
        //   <body>
        //     <div class="title">
        //       <h1>
        //         Título
        //       </h1>
        //     </div>
        //     <form action="/charge" method="post" id="payment-form">
        //       <div class="form-row">
        //         <div class="mini-title-container">
        //           <label for="card-element" class="label">
        //             Información de la tarjeta
        //           </label>
        //         </div>
        //         <div id="card-element">
        //           <!-- A Stripe Element will be inserted here. -->
        //         </div>

        //         <!-- Used to display form errors. -->
        //         <div id="card-errors" role="alert" class="errors"></div>
        //       </div>

        //       <button class="submit-btn">Guardar método de pago</button>
        //       <div class="extra-info-container">
        //         <div class="powered-by-container">
        //           <h3>Proveído por </h3>
        //           <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Stripe_logo%2C_revised_2014.png" class="stripe-logo">
        //         </div>
        //       </div>
        //       <div>
        //         <h6 id="obj">
        //         Hols
        //         </h6>
        //       </div>
        //     </form>
        //     <script>
        //       var stripe = Stripe(
        //         "pk_test_51HYM73FJbeEVXG7GYXRhTfmJ7c4u92BMFAslCd4DydDRqJYCPETbLJO5dwz1nAK3rXSrPaJKKoRldB32fAtyQtsr00UmzwIdiT"
        //       );

        //       // Create an instance of Elements.
        //       var elements = stripe.elements();

        //       // Custom styling can be passed to options when creating an Element.
        //       // (Note that this demo uses a wider set of styles than the guide below.)
        //       var style = {
        //         base: {
        //           color: "#32325d",
        //           fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        //           fontSmoothing: "antialiased",
        //           fontSize: "16px",
        //           "::placeholder": {
        //             color: "#aab7c4",
        //           },
        //         },
        //         invalid: {
        //           color: "#fa755a",
        //           iconColor: "#fa755a",
        //         },
        //       };

        //       // Create an instance of the card Element.
        //       var card = elements.create("card", { style: style });

        //       // Add an instance of the card Element into the "card-element" <div>.
        //       card.mount("#card-element");

        //       // Handle real-time validation errors from the card Element.
        //       card.on("change", function (event) {
        //         var displayError = document.getElementById("card-errors");
        //         if (event.error) {
        //           displayError.textContent = event.error.message;
        //         } else {
        //           displayError.textContent = "";
        //         }
        //       });

        //       // Handle form submission.
        //       var form = document.getElementById("payment-form");
        //       form.addEventListener("submit", function (event) {
        //         event.preventDefault();

        //         stripe.createToken(card).then(function (result) {
        //           if (result.error) {
        //             // Inform the user if there was an error.
        //             var errorElement = document.getElementById("card-errors");
        //             errorElement.textContent = result.error.message;
        //           } else {
        //             // Send the token to your server.
        //             stripeTokenHandler(result.token);

        //           }
        //         });
        //       });

        //       // Submit the form with the token ID.
        //       function stripeTokenHandler(token) {
        //         // Insert the token ID into the form so it gets submitted to the server
        //         var form = document.getElementById("payment-form");
        //         var hiddenInput = document.createElement("input");
        //         hiddenInput.setAttribute("type", "hidden");
        //         hiddenInput.setAttribute("name", "stripeToken");
        //         hiddenInput.setAttribute("value", token.id);
        //         form.appendChild(hiddenInput);

        //         // Submit the form
        //         form.submit();
        //       }

        //     </script>
        //   </body>`,
        // }}
        source={require("../StripeContainer/index.html")}
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
