import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import HomeHorizontalScroll from "./HomeHorizontalScroll";

const Home_compo = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    function wait(timeout) {
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    }

    wait(500).then(() => {
      setRefreshing(false);
      // setContent(theContent2);
    });
  }, [refreshing]);

  var tagArray = [0, 1, 2, 3, 4];

  function randomizeArray(array) {
    var states = [];
    for (var i = 0; i < array.length; i++) {
      states.push(false);
    }
    for (var i = 0; i < array.length; ) {
      var pos = Math.round(Math.random() * array.length);
      if (states[pos] == false) {
        array[pos] = i;
        states[pos] = true;
        i++;
      }
    }
  }
  randomizeArray(tagArray);

  return (
    <SafeAreaView style={styles.SafeAreaView_}>
      <View style={styles.header}>
        <Text style={styles.title}>Inicio</Text>
      </View>
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <HomeHorizontalScroll category={tagArray[0]} />
          <HomeHorizontalScroll category={tagArray[1]} />
          <HomeHorizontalScroll category={tagArray[2]} />
          <HomeHorizontalScroll category={tagArray[3]} />
          <HomeHorizontalScroll category={tagArray[4]} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView_: {
    marginTop: Platform.OS === "ios" ? 0 : 22,
    backgroundColor: "rgb(255,255,255)",
    height: "100%",
  },
  container: {
    height: "100%",
    backgroundColor: "rgb(240,240,240)",
    justifyContent: "space-around",
    paddingBottom: "18%",
  },
  header: {
    backgroundColor: "rgb(255,255,255)",
    height: "10%",
    justifyContent: "center",
  },
  title: {
    marginLeft: "12%",
    fontSize: 40,
    fontWeight: "500",
  },
});

export default Home_compo;
