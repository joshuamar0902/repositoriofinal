import React from "react";
import { Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// Pantalla de IMC
function ImcScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Calculadora de IMC
      </Text>
      <Text>Pantalla para calcular el Índice de Masa Corporal</Text>
      <Button
        title="Ir a Cambio de Divisas"
        onPress={() => navigation.navigate("Divisas")}
      />
    </View>
  );
}

// Pantalla de Cambio de Divisas
function DivisasScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Cambio de Divisas
      </Text>
      <Text>Pantalla para convertir monedas</Text>
      <Button
        title="Ir a Cálculo de Propinas"
        onPress={() => navigation.navigate("Propinas")}
      />
    </View>
  );
}

// Pantalla de Propinas
function PropinasScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Cálculo de Propinas
      </Text>
      <Text>Pantalla para calcular propinas</Text>
      <Button title="Volver al IMC" onPress={() => navigation.navigate("IMC")} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IMC">
        <Stack.Screen name="IMC" component={ImcScreen} />
        <Stack.Screen name="Divisas" component={DivisasScreen} />
        <Stack.Screen name="Propinas" component={PropinasScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
