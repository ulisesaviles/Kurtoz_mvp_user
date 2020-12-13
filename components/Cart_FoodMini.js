import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Cart_FoodMini() {
  const navigation = useNavigation();

  return (
    <View style={styles.foodMinisuperContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Food_compo", {
            restaurantId: "tpiauGjqb5yg1bA7qJmm",
            foodId: "6k0TJESaADWe36aouDp8",
          });
        }}
      >
        <View style={styles.foodMiniContainer}>
          <View style={styles.cuantityContainer}>
            <Text style={styles.foodMiniCuantity}>1</Text>
          </View>
          <View style={styles.foodMinitextContainer}>
            <Text style={styles.foodMiniFoodName}>Nieve de Vainilla</Text>
            <View style={styles.foodMiniExtraIngredients}>
              <View style={styles.foodMiniExtraIngredientContainer}>
                <Text style={styles.extraPrice}>+ $20.00 MXN</Text>
                <Text style={styles.foodMiniExtraIngredient}>Crema batida</Text>
              </View>
              <View style={styles.foodMiniExtraIngredientContainer}>
                <Text style={styles.extraPrice}>+ $20.00 MXN</Text>
                <Text style={styles.foodMiniExtraIngredient}>Crema batida</Text>
              </View>
              <View style={styles.foodMiniExtraIngredientContainer}>
                <Text style={styles.extraPrice}>+ $20.00 MXN</Text>
                <Text style={styles.foodMiniExtraIngredient}>Crema batida</Text>
              </View>
            </View>
            <Text style={styles.foodMiniPrice}>$ 120.00 MXN</Text>
          </View>
          <Image
            source={{
              uri:
                "https://scontent.ftij1-1.fna.fbcdn.net/v/t1.0-9/27858576_172626690015090_2321536906365458293_n.jpg?_nc_cat=106&_nc_sid=8bfeb9&_nc_eui2=AeE6-6KCW8trFvQxazSM4QEVvUI5v6I1YP29Qjm_ojVg_YDtO5jdy0dbUu7-EY1U01jsEj6eEsAMtg1vNlDi0orZ&_nc_ohc=DCKP55MdsHUAX9BGKN1&_nc_ht=scontent.ftij1-1.fna&oh=1269804a0024db38e16ba82f993fb37a&oe=5F814571",
            }}
            style={styles.foodMiniPhoto}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.foodMiniDeleteContainer}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="minus-circle"
            size={24}
            color="rgb(200,0,0)"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  foodMiniContainer: {
    width: "90%",
    marginBottom: 2,
    paddingLeft: "3%",
    paddingVertical: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  foodMiniPhoto: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  foodMiniExtraIngredient: {
    width: "100%",
    marginBottom: "4%",
  },
  foodMiniExtraIngredients: {
    fontWeight: "300",
    width: "100%",
  },
  foodMiniFoodName: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: "5%",
  },
  foodMinitextContainer: {
    width: "65%",
    height: "100%",
    marginRight: "8%",
  },
  foodMiniPrice: {
    fontSize: 14,
    fontWeight: "500",
  },
  foodMiniExtraIngredient: {
    alignSelf: "flex-end",
  },
  foodMiniExtraIngredientContainer: {
    fontWeight: "400",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "2%",
    paddingLeft: "4%",
  },
  foodMinisuperContainer: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "rgb(255, 255, 255)",
  },
  foodMiniDeleteContainer: {
    width: "8%",
    marginLeft: "-3%",
    alignItems: "center",
    justifyContent: "center",
  },
  foodMiniCuantity: {
    fontSize: 20,
    color: "rgb(255,255,255)",
    color: "rgb(0,0,0)",
    marginRight: "4%",
  },
});

export default Cart_FoodMini;
