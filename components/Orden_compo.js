import React from "react";
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GoBackBtn from "./GoBackBtn";

const Orden_compo = ({ route }) => {
  const navigation = useNavigation();
  function humanDate(timeStamp) {
    let date = new Date(timeStamp);
    return `${date.getDate()} ${stringMonth(
      date.getMonth()
    )} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }

  function stringMonth(intMonth) {
    if (intMonth == 0) {
      return "Ene";
    } else if (intMonth == 1) {
      return "Feb";
    } else if (intMonth == 2) {
      return "Mar";
    } else if (intMonth == 3) {
      return "Abr";
    } else if (intMonth == 4) {
      return "May";
    } else if (intMonth == 5) {
      return "Jun";
    } else if (intMonth == 6) {
      return "Jul";
    } else if (intMonth == 7) {
      return "Ago";
    } else if (intMonth == 8) {
      return "Sep";
    } else if (intMonth == 9) {
      return "Oct";
    } else if (intMonth == 10) {
      return "Nov";
    } else if (intMonth == 11) {
      return "Dic";
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.ScrollView}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{
              uri: route.params.order.auxData.restaurantImg,
            }}
            style={styles.img}
          >
            <GoBackBtn />
          </ImageBackground>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.detailsContaienr}>
            <Text style={styles.restaurantName}>
              {route.params.order.auxData.restaurantName}
            </Text>
            <Text style={styles.details}>{`Órden ${
              route.params.order.order.type
            }  •  ${humanDate(
              route.params.order.order.createdAt.toDate()
            )}`}</Text>
          </View>
          <View style={styles.yourOrderContainer}>
            <Text style={styles.yourOrder}>Tu órden</Text>
          </View>
          <>
            {route.params.order.order.products.map((product) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Food_compo", {
                    restaurantId: route.params.order.auxData.restaurantId,
                    foodId: product.productId,
                  });
                }}
              >
                <View style={styles.foodMiniContainer}>
                  <View style={styles.foodMinitextContainer}>
                    <View style={styles.foodMiniTtitleContainer}>
                      <View style={styles.cuantityContainer}>
                        <Text style={styles.foodMiniCuantity}>
                          {product.quantity}
                        </Text>
                      </View>
                      <Text style={styles.foodMiniFoodName}>
                        {product.productName}
                      </Text>
                    </View>
                    <View style={styles.variantContainer}>
                      <Text style={styles.variant}>{product.variant}</Text>
                    </View>
                    <View style={styles.foodMiniExtraIngredients}>
                      {product.modifierGroups.map((modifierGroup) => (
                        // <View style={styles.foodMiniExtraIngredientContainer}>
                        //   <Text style={styles.extraPrice}>
                        //     {`+ $${modifier.price}.00 MXN`}
                        //   </Text>
                        //   <Text style={styles.foodMiniExtraIngredient}>
                        //     {modifier.name}
                        //   </Text>
                        // </View>
                        <>
                          <Text style={styles.variant}>
                            {`• ${modifierGroup.name}:`}
                          </Text>
                          {modifierGroup.selected.map((modifier) => (
                            <View
                              style={styles.foodMiniExtraIngredientContainer}
                            >
                              <Text style={styles.extraPrice}>
                                {`+ $${modifier.price}.00 MXN`}
                              </Text>
                              <Text style={styles.foodMiniExtraIngredient}>
                                {modifier.name}
                              </Text>
                            </View>
                          ))}
                        </>
                      ))}
                    </View>
                    <Text style={styles.foodMiniPrice}>
                      {`$ ${product.price}.00 MXN`}
                    </Text>
                  </View>
                  <Image
                    source={{
                      uri: product.productImg,
                    }}
                    style={styles.foodMiniPhoto}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </>
          <View style={styles.totalContainer}>
            <Text style={styles.totalStr}>Total: </Text>
            <Text
              style={styles.totalNum}
            >{`$ ${route.params.order.order.total}.00 MXN`}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "rgb(240,240,240)",
  },
  imageContainer: {
    width: "100%",
    height: 250,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {},
  detailsContaienr: {
    backgroundColor: "rgb(255, 255, 255)",
    padding: 20,
  },
  restaurantName: {
    fontSize: 35,
    fontWeight: "500",
    marginBottom: 10,
  },
  details: {
    fontSize: 18,
  },
  yourOrder: {
    fontSize: 30,
    marginLeft: 20,
    marginBottom: 10,
  },
  foodMiniContainer: {
    backgroundColor: "rgb(255,255,255)",
    width: "100%",
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
    marginRight: "4%",
  },
  foodMiniExtraIngredient: {
    width: "100%",
    marginBottom: "4%",
  },
  foodMiniExtraIngredients: {
    fontWeight: "300",
    width: "100%",
    marginLeft: "15%",
  },
  foodMiniFoodName: {
    fontSize: 20,
    fontWeight: "400",
  },
  foodMinitextContainer: {
    width: "65%",
    height: "100%",
    marginRight: "8%",
  },
  foodMiniPrice: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: "15%",
  },
  foodMiniExtraIngredient: {
    alignSelf: "flex-end",
  },
  foodMiniExtraIngredientContainer: {
    fontWeight: "400",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: "2%",
    paddingLeft: "4%",
  },
  variantContainer: {
    marginLeft: "15%",
    marginBottom: "2%",
  },
  foodMiniCuantity: {
    fontSize: 15,
    color: "rgb(255,255,255)",
    color: "rgb(0,0,0)",
    marginRight: "4%",
  },
  cuantityContainer: {
    backgroundColor: "rgb(240,240,240)",
    width: 20,
    height: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "5%",
  },
  foodMiniTtitleContainer: {
    flexDirection: "row",
  },
  yourOrderContainer: {
    width: "100%",
    backgroundColor: "rgb(255, 255, 255)",
  },
  totalContainer: {
    backgroundColor: "rgb(255,255,255)",
    padding: 20,
    flexDirection: "row",
    alignItems: "baseline",
  },
  totalStr: {
    fontSize: 25,
  },
  totalNum: {
    fontSize: 20,
  },
  ScrollView: {},
  variant: {
    width: "90%",
  },
});

export default Orden_compo;
