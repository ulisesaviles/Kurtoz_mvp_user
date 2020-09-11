import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function RestaurantLogo_touchable() {
  const navigation = useNavigation();

  return (
    <View style={styles.logoContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Restaurant_compo");
        }}
      >
        <Image
          source={{
            uri:
              "https://scontent.ftij1-1.fna.fbcdn.net/v/t1.0-9/26047325_162187624392330_4697441293510542641_n.jpg?_nc_cat=107&_nc_sid=09cbfe&_nc_eui2=AeF1bzxxCwXiNus1dH9645amC-xAIqXIH7gL7EAipcgfuN5REyTr6OBNNsGAiaANfaj5Ok5Djpu60kTf415hEHTm&_nc_ohc=tUdj3A4T6a0AX9SGXXM&_nc_ht=scontent.ftij1-1.fna&oh=2168a159be2e61e0283885e80031c54d&oe=5F7FF475",
          }}
          style={styles.restaurantLogo}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    margin: "4%",
  },
  restaurantLogo: {
    height: 157,
    width: 157,
    borderRadius: 15,
  },
});

export default RestaurantLogo_touchable;
