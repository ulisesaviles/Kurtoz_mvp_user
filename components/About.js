import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import GoBackBtn from "./GoBackBtn";

const About = ({ navigation }) => {
  const terms = [
    {
      title: "¿Quién tiene acceso a mi información?",
      bullets: [
        "Los desarrolladores de la aplicación no comparten su información con el exterior por motivos legales.",
        "Ningún usuario tiene acceso a la información de otro usuario.",
      ],
    },
    {
      title: "¿Quién tiene acceso a mis tarjetas de crédito/débito?",
      bullets: [
        "Nadie, para disminuir riesgsos la aplicación trabaja con el manejador de pagos 'Stripe', una api de pagos segura que proteje su información.",
        "La aplicación no conoce el número completo de su tarjeta, sólamente tenemos acceso a los últimos cuatro dígitos.",
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.goBackContainer}>
          <GoBackBtn />
        </View>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.header}>Acerca del app</Text>
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
          <View style={styles.developedByContainer}>
            <Text style={styles.developer}>
              Desarrollado por: Ulises Aviles
            </Text>
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
  developedByContainer: {
    alignItems: "center",
    marginVertical: 5,
  },
  developer: {
    fontSize: 15,
    fontWeight: "600",
    color: "rgb(80, 80, 80)",
  },
});

export default About;
