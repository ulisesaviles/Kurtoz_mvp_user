import React, { useState } from "react";
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import Rating from "./Rating";
import { Entypo } from "@expo/vector-icons";
import FoodMini from "./FoodMini";
import FoodCategory from "./FoodCategory";
import firebase from "../database/database";
import GoBackBtn from "./GoBackBtn";

const Restaurant_compo = ({ navigation, route }) => {
  // Restaurant Details:
  const [updater, update] = useState(" .");
  const [restaurantName, setRestaurantName] = useState(" - - -");
  const [restaurantCategory, setRestaurantCategory] = useState(" - - -");
  const [restaurantRating, setRestaurantRating] = useState(" -");
  const [restaurantSchedule, setRestaurantSchedule] = useState(" - am - - pm");
  const [restaurantAddress, setRestaurantAddress] = useState(" - - - - -");
  const [restaurantImg, setRestaurantImg] = useState(
    "https://thumbs.gfycat.com/CompleteZanyIlsamochadegu-small.gif"
  );
  const [menus, setMenus] = useState([]);

  const [menuName, setMenuName] = useState(" - - - -");
  function capitalize(word) {
    arr = word.split(" ");
    word = "";
    for (let i = 0; i < arr.length; i++) {
      word += arr[i][0].toUpperCase();
      for (let j = 1; j < arr[i].length; j++) {
        word += arr[i][j];
      }
      word += " ";
    }
    return word;
  }

  getRestaurantDetais(route.params.id);
  async function getRestaurantDetais(restaurantId) {
    if (
      restaurantName == " - - -" &&
      restaurantCategory == " - - -" &&
      restaurantRating == " -" &&
      restaurantSchedule == " - am - - pm" &&
      restaurantAddress == " - - - - -" &&
      restaurantImg ==
        "https://thumbs.gfycat.com/CompleteZanyIlsamochadegu-small.gif"
    ) {
      await firebase
        .firestore()
        .collection("restaurants")
        .doc(restaurantId)
        .get()
        .then((restaurant) => {
          setRestaurantName(restaurant.data().name);
          setRestaurantCategory(restaurant.data().category);
          setRestaurantRating(restaurant.data().rating);
          setRestaurantAddress(restaurant.data().address);
          setRestaurantImg(restaurant.data().img);
          let dayOfTheWeek = new Date();
          dayOfTheWeek = dayOfTheWeek.getDay();
          setRestaurantSchedule(
            `${restaurant.data().labor_days[dayOfTheWeek].open} - ${
              restaurant.data().labor_days[dayOfTheWeek].close
            }`
          );
          getMenus(route.params.id);
        });
    }
  }

  async function getMenus(restaurantId) {
    if (menus.length == 0) {
      await firebase
        .firestore()
        .collection("restaurants")
        .doc(restaurantId)
        .collection("menus")
        .limit(1)
        .get()
        .then((menus_) => {
          menus_.forEach((menu) => {
            getCategories(restaurantId, menu.data().categories).then(
              (categories) => {
                let subObj = {
                  menuName: menu.data().name,
                  categories: categories,
                };
                menus.push(subObj);
                setMenus(menus);
                update(" ");
              }
            );
          });
        });
    }
  }

  async function getCategories(restaurantId, categoriesToGet) {
    for (let i = 0; i < categoriesToGet.length; i++) {
      await firebase
        .firestore()
        .collection("restaurants")
        .doc(restaurantId)
        .collection("categories")
        .doc(categoriesToGet[i].id)
        .get()
        .then((category) => {
          categoriesToGet[i] = {
            categoryName: category.data().name,
            products: category.data().products,
          };
        });
    }
    return categoriesToGet;
  }

  if (menus[0] != undefined) {
    return (
      <View>
        <View style={styles.scrollContainer}>
          <ScrollView>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={{
                  uri: restaurantImg,
                }}
                style={styles.backgroundImage}
              >
                <GoBackBtn />
              </ImageBackground>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.title}>{`${restaurantName} ${updater}`}</Text>
              <View style={styles.horizontalDescription}>
                <Text style={styles.category}>{restaurantCategory}</Text>
                <Rating rating={restaurantRating} />
              </View>
              <View style={styles.horarioContainer}>
                <EvilIcons name="clock" size={16} color="black" />
                <Text
                  style={styles.horario}
                >{`Abierto de ${restaurantSchedule}`}</Text>
              </View>
            </View>
            <View style={styles.locationContainer}>
              <Entypo name="location-pin" size={18} color="grey" />
              <Text style={styles.location}>{restaurantAddress}</Text>
            </View>
            <View style={styles.menuContainer}>
              <Text style={styles.menu}>{capitalize(menus[0].menuName)}</Text>
            </View>
            <>
              {menus[0].categories.map((category) => (
                <>
                  <FoodCategory title={capitalize(category.categoryName)} />
                  {category.products.map((product) => (
                    <FoodMini foodId={product} restaurantId={route.params.id} />
                  ))}
                </>
              ))}
            </>
          </ScrollView>
        </View>
      </View>
    );
  }
  return (
    <View>
      <View style={styles.scrollContainer}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={{
                uri: restaurantImg,
              }}
              style={styles.backgroundImage}
            >
              <GoBackBtn />
            </ImageBackground>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.title}>{restaurantName}</Text>
            <View style={styles.horizontalDescription}>
              <Text style={styles.category}>{restaurantCategory}</Text>
              <Rating rating={restaurantRating} />
            </View>
            <View style={styles.horarioContainer}>
              <EvilIcons name="clock" size={16} color="black" />
              <Text
                style={styles.horario}
              >{`Abierto de ${restaurantSchedule}`}</Text>
            </View>
          </View>
          <View style={styles.locationContainer}>
            <Entypo name="location-pin" size={18} color="grey" />
            <Text style={styles.location}>{restaurantAddress}</Text>
          </View>
          <View style={styles.menuContainer}>
            <Text style={styles.menu}>{menuName}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    height: 260,
    backgroundColor: "rgb(0,0,0)",
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 13,
  },
  scrollContainer: {
    backgroundColor: "rgb(240,240,240)",
    height: "100%",
  },
  descriptionContainer: {
    padding: 20,
    height: 140,
    backgroundColor: "rgb(255, 255, 255)",
    marginBottom: 2,
  },
  category: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "300",
  },
  horario: {
    fontSize: 16,
    fontWeight: "300",
    marginHorizontal: 2,
  },
  horarioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  horizontalDescription: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    height: 60,
    marginBottom: 2,
    padding: "5%",
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontWeight: "300",
    fontSize: 16,
  },
  menuContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    padding: 20,
  },
  menu: {
    fontSize: 30,
    fontWeight: "300",
  },
});

export default Restaurant_compo;
