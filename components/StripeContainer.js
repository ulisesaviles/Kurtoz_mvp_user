import React, { useState } from "react";
import { WebView } from "react-native-webview";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import firebase from "../database/database";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import GoBackBtn from "./GoBackBtn";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const StripeContainer = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const loadingImg =
    "https://thumbs.gfycat.com/CompleteZanyIlsamochadegu-small.gif";
  let userData;
  const [userData_, setUserData_] = useState("");
  const [gotUser, setGotUser] = useState(false);
  const [successfullyAdded, setSuccessfullyAdded] = useState(false);
  const [error, setError] = useState(false);

  async function getUser() {
    if (!gotUser) {
      setGotUser(true);
      try {
        let value = await AsyncStorage.getItem("userData");
        value = JSON.parse(value);
        if (value !== null) {
          userData = value;
          setUserData_(userData);
          console.log(userData);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  getUser();

  async function savePaymentMethod(message) {
    let token = JSON.parse(message.nativeEvent.data);
    console.log(token);
    setLoading(true);
    try {
      await axios({
        method: "post",
        url:
          "https://us-central1-food-delivery-app-86ccd.cloudfunctions.net/createPaymentMetod",
        data: {
          userId: userData_.id,
          token: token,
        },
      }).then(async (response) => {
        console.log(response);
        setLoading(false);
        if (response.status == 200) {
          setSuccessfullyAdded(true);
          await firebase
            .firestore()
            .collection("users")
            .doc(userData_.id)
            .update({ paymentInProcess: false });
        } else {
          setError(true);
        }
      });
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  }
  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.goBackContainer}>
            <GoBackBtn style={styles.goBack} />
          </View>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.header}>Agregar tarjeta</Text>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <SimpleLineIcons
            name="credit-card"
            size={150}
            color="black"
            style={styles.cardIcon}
          />
        </View>
        <View style={styles.successContainer}>
          <Text style={styles.error}>Error al agregar pago</Text>
          <MaterialIcons name="cancel" size={25} color="rgb(200,0,0)" />
        </View>
        <View style={styles.continueContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={styles.btnContainer}>
              <Text style={styles.continue}>Continuar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  if (!loading && !successfullyAdded) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.goBackContainer}>
            <GoBackBtn style={styles.goBack} />
          </View>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.header}>Agregar tarjeta</Text>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <SimpleLineIcons
            name="credit-card"
            size={150}
            color="black"
            style={styles.cardIcon}
          />
        </View>
        <WebView
          source={{
            html: `<head>
          <meta charset="utf-8" />
          <title>Stripe Card Payments</title>
          <meta name="description" content="Payments handler" />
          <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
          <script src="https://js.stripe.com/v3/"></script>
          <style>
            body {
              padding: 5vw;
              margin: 0;
              /* height: 500px; */
            }
      
            .StripeElement {
              box-sizing: border-box;
      
              height: 40px;
      
              padding: 10px 12px;
      
              border: 1px solid transparent;
              border-radius: 4px;
              background-color: white;
      
              box-shadow: 0 1px 3px 0 #e6ebf1;
              -webkit-transition: box-shadow 150ms ease;
              transition: box-shadow 150ms ease;
            }
            
            .success-container {
              background-color: white;
              text-align: center;
              height: auto;
            }
      
            .success {
              font-family: Arial, Helvetica, sans-serif;
              font-weight: 700;
            }
      
            .StripeElement--focus {
              box-shadow: 0 1px 3px 0 #cfd7df;
            }
      
            .StripeElement--invalid {
              border-color: #fa755a;
            }
      
            .StripeElement--webkit-autofill {
              background-color: #fefde5 !important;
            }
      
            .label {
              font-size: 1em;
              font-family: Arial, Helvetica, sans-serif;
              font-weight: 600;
              color: rgb(119, 119, 119);
            }
      
            .mini-title-container {
              padding-bottom: 15px;
            }
      
            .submit-btn {
              background-color: rgb(0, 0, 0);
              color: rgb(255, 255, 255);
              font-weight: 600;
              border-radius: 10px;
              font-size: 20px;
              width: 90vw;
              margin-top: 8vw;
              padding: 2vw;
            }
      
            .stripe-logo {
              width: 62.5px;
              height: 25px;
            }
      
            .powered-by-container {
              display: inline-flex;
              align-items: center;
              font-family: Arial, Helvetica, sans-serif;
              color: rgb(119, 119, 119);
            }
      
            .extra-info-container {
              text-align: center;
            }
      
            .errors {
              font-family: Arial, Helvetica, sans-serif;
              color: rgb(255, 0, 0);
              font-size: 0.9em;
              margin-top: 5px;
            }
      
          </style>
        </head>
      
        <body id="body" class="body">
      
          <!-- <form action="/charge" method="post" id="payment-form"> -->
          <form id="payment-form">
            <div class="form-row">
              <div class="mini-title-container">
                <label for="card-element" class="label">
                  Información de la tarjeta
                </label>
              </div>
              <div id="card-element">
                <!-- A Stripe Element will be inserted here. -->
              </div>
          
              <!-- Used to display form errors. -->
              <div id="card-errors" role="alert" class="errors"></div>
            </div>
          
            <button class="submit-btn">Guardar método de pago</button>
            <div class="extra-info-container">
              <div class="powered-by-container">
                <h3>Proveído por </h3>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Stripe_logo%2C_revised_2014.png" class="stripe-logo">
              </div>
            </div>
            <h6 id="obj"></h6>
            <!-- <script src="script.js"></script> -->
            <script src="https://js.stripe.com/v3/"></script>
              <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
              <script>
                
                var stripe = Stripe(
                  "pk_test_51HYM73FJbeEVXG7GYXRhTfmJ7c4u92BMFAslCd4DydDRqJYCPETbLJO5dwz1nAK3rXSrPaJKKoRldB32fAtyQtsr00UmzwIdiT"
                );
                // Create an instance of Elements.
                var elements = stripe.elements();
      
                // Custom styling can be passed to options when creating an Element.
                // (Note that this demo uses a wider set of styles than the guide below.)
                var style = {
                  base: {
                    color: "#32325d",
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: "antialiased",
                    fontSize: "16px",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a",
                  },
                };
      
                // Create an instance of the card Element.
                var card = elements.create("card", { style: style });
      
                // Add an instance of the card Element into the 'card-element' <div>.
                card.mount("#card-element");
      
                // Handle real-time validation errors from the card Element.
                card.on("change", function (event) {
                  var displayError = document.getElementById("card-errors");
                  if (event.error) {
                    displayError.textContent = event.error.message;
                  } else {
                    displayError.textContent = "";
                  }
                });
                
                // Handle form submission.
                var form = document.getElementById("payment-form");
                form.addEventListener("submit", async function (event) {
                  event.preventDefault();
                  
                  // location.reload()
                  // console.log(token);
                  const token = await stripe.createToken(card);
                  window.ReactNativeWebView.postMessage(JSON.stringify(token));
                  // axios({
                  //   url: "https://us-central1-food-delivery-app-86ccd.cloudfunctions.net/createPaymentMetod",
                  //   method: "POST",
                  //   data: {
                  //     userId: "M97HqZEoJWtJygYQGXNL",
                  //     token: token,
                  //   }
                  // }).then((Response) => {
                  //   console.log(Response);
                  // });
                  
                });
      
                // Submit the form with the token ID.
                function successHandler(token) {
                  // // Insert the token ID into the form so it gets submitted to the server
                  // var form = document.getElementById("payment-form");
                  // var hiddenInput = document.createElement("input");
                  // hiddenInput.setAttribute("type", "hidden");
                  // hiddenInput.setAttribute("name", "stripeToken");
                  // hiddenInput.setAttribute("value", token.id);
                  // form.appendChild(hiddenInput);
                  // // Submit the form
                  // form.submit();
                }
                
              </script>
        </body>`,
          }}
          //window.ReactNativeWebView.postMessage(JSON.stringify(result.token));
          // source={require("../StripeContainer/index.html")}
          originWhitelist={["*"]}
          allowingReadAccessToURL={true}
          scrollEnabled={false}
          startInLoadingState
          onMessage={savePaymentMethod}
        />
      </View>
    );
  } else if (loading && !successfullyAdded) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.goBackContainer}>
            <GoBackBtn style={styles.goBack} />
          </View>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.header}>Agregar tarjeta</Text>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <SimpleLineIcons
            name="credit-card"
            size={150}
            color="black"
            style={styles.cardIcon}
          />
        </View>
        <View style={styles.loadingContainer}>
          <Image
            source={{
              uri: loadingImg,
            }}
            style={styles.loadingImage}
          />
        </View>
      </View>
    );
  } else if (!loading && successfullyAdded) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.goBackContainer}>
            <GoBackBtn style={styles.goBack} />
          </View>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.header}>Agregar tarjeta</Text>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <SimpleLineIcons
            name="credit-card"
            size={150}
            color="black"
            style={styles.cardIcon}
          />
        </View>
        <View style={styles.successContainer}>
          <Text style={styles.transaccion}>Listo</Text>
          <MaterialIcons name="check-circle" size={35} color="rgb(0,200,0)" />
        </View>
        <View style={styles.continueContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={styles.btnContainer}>
              <Text style={styles.continue}>Continuar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: "rgb(255,255,255)",
    width: "100%",
    height: 1000,
    alignItems: "center",
  },
  loadingImage: {
    width: 200,
    height: 200,
  },
  transaccion: {
    fontSize: 40,
    fontWeight: "500",
    marginRight: "2%",
  },
  error: {
    fontSize: 30,
    fontWeight: "500",
    marginRight: "2%",
  },
  container: {
    backgroundColor: "rgb(255,255,255)",
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "25%",
    marginVertical: "5%",
  },
  cardIcon: {},
  headerContainer: {
    flexDirection: "row",
    height: "13%",
    borderBottomColor: "rgb(100,100,100)",
  },
  goBackContainer: {
    height: "100%",
    paddingTop: "11%",
    paddingLeft: "5%",
    width: "20%",
  },
  headerTitleContainer: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: "15%",
    fontSize: 25,
    fontWeight: "600",
  },
  successContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    // paddingTop: "10%",
  },
  continueContainer: {
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
  },
  btnContainer: {
    backgroundColor: "rgb(0,0,0)",
    borderRadius: 100,
    height: "65%",
    paddingHorizontal: "10%",
    justifyContent: "center",
  },
  continue: {
    color: "rgb(255,255,255)",
    fontWeight: "700",
    fontSize: 25,
  },
});

export default StripeContainer;
