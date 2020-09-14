import * as firebase from "firebase";
import firestore from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEoyKLtC6gKxYYhmqM93nRnwyYwXouLfQ",
  authDomain: "food-delivery-app-86ccd.firebaseapp.com",
  databaseURL: "https://food-delivery-app-86ccd.firebaseio.com",
  projectId: "food-delivery-app-86ccd",
  storageBucket: "food-delivery-app-86ccd.appspot.com",
  messagingSenderId: "279529327857",
  appId: "1:279529327857:web:ce41f74cc050dc9856ed50",
  measurementId: "G-D51DC6908H",
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
