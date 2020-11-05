import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import "react-native-gesture-handler";
import GoBackBtn from "./GoBackBtn";

const Help = ({ navigation }) => {
  const terms = [
    {
      title: "¿Cómo hacer una órden?",
      bullets: [
        "Buscar tu platillo favortio en la pestaña de búsqueda y agregarlo al carrito.",
        "En la pestaña de 'Cuenta', dirigirse a métodos de pago y agregar una tarjeta de crédito o débito válida.",
        "Regresar al carrito y presionar 'Completar orden'.",
        "Seleccionar tu método de pago de preferencia y realizar la transacción.",
        "Si la transacción es exitosa, ¡tu pedido te estará esperando en Kurtoz!.",
        "De no ser así, te recomendamos seleccionar otro método de pago o contactar a tu banco.",
      ],
    },
    {
      title: "¿Puedo pagar con efectivo?",
      bullets: [
        "Por el momento no contamos con pagos por efectivo por cuestiones de logística.",
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
          <Text style={styles.header}>Ayuda</Text>
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
    // justifyContent: "space-around",
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
});

export default Help;
