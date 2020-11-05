import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import GoBackBtn from "./GoBackBtn";

const Terms = () => {
  const terms = [
    {
      title: "Pagos",
      bullets: [
        "Vamos a guardar tus tarjetas y nos vamos a gastar todo el dinero que tengan.",
        "En el momento en que aceptas los términos y condiciones le estás vendiendo tu alma a  xdev.",
        "Ningún usuario tiene derecho a tomar acciones legales contra los desarrolladores de xdev por vender su información.",
        "Cada usuario debe de gastar al menos 10,000.00 MXN al mes en la app. De no ser así, recibirá una multa de 100,000.00 MXN por cada día que pase.",
      ],
    },
    {
      title: "Privacidad",
      bullets: [
        "Vamos a guardar tus tarjetas y nos vamos a gastar todo el dinero que tengan.",
        "En el momento en que aceptas los términos y condiciones le estás vendiendo tu alma a  xdev.",
        "Ningún usuario tiene derecho a tomar acciones legales contra los desarrolladores de xdev por vender su información.",
        "Cada usuario debe de gastar al menos 10,000.00 MXN al mesen la app. De no ser así, recibirá una multa de 100,000.00 MXN por cada día que pase.",
      ],
    },
    {
      title: "Uso del app",
      bullets: [
        "Vamos a guardar tus tarjetas y nos vamos a gastar todo el dinero que tengan.",
        "En el momento en que aceptas los términos y condiciones le estás vendiendo tu alma a  xdev.",
        "Ningún usuario tiene derecho a tomar acciones legales contra los desarrolladores de xdev por vender su información.",
        "Cada usuario debe de gastar al menos 10,000.00 MXN al mes en la app. De no ser así, recibirá una multa de 100,000.00 MXN por cada día que pase.",
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.goBackContainer}>
          <GoBackBtn style={styles.goBack} />
        </View>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.header}>Términos y condiciones</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.termsContainer}>
          {terms.map((termCategory) => (
            <View style={styles.termCategoryContainer}>
              <Text style={styles.termTitle}>{termCategory.title}</Text>
              {termCategory.bullets.map((bullet) => (
                <View style={styles.bulletContainer}>
                  <Text style={styles.bullet}>•</Text>
                  <Text>{bullet}</Text>
                </View>
              ))}
            </View>
          ))}
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
  termsContainer: {
    marginTop: "2%",
    marginBottom: "30%",
  },
  termTitle: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 8,
  },
  termCategoryContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    paddingHorizontal: "8%",
    paddingVertical: 20,
    marginBottom: 5,
  },
  bulletContainer: {
    flexDirection: "row",
    marginBottom: 4,
    paddingRight: "5%",
  },
  bullet: {
    fontWeight: "900",
    marginHorizontal: "2%",
  },
  headerContainer: {
    flexDirection: "row",
    height: "12%",
    borderBottomColor: "rgb(100,100,100)",
    backgroundColor: "rgb(255,255,255)",
    marginBottom: 1,
  },
  goBackContainer: {
    height: "100%",
    paddingTop: "12%",
    paddingLeft: "5%",
    width: "15%",
  },
  headerTitleContainer: {
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: "15%",
    fontSize: 25,
    fontWeight: "600",
  },
});

export default Terms;
