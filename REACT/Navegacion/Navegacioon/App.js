import React, { useState } from "react";
import { Text, View, Button, TextInput, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// Pantalla de IMC
function ImcScreen({ navigation }) {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setImc] = useState(null);

  const calcularIMC = () => {
    const h = parseFloat(altura) / 100;
    const p = parseFloat(peso);
    if (!isNaN(h) && !isNaN(p) && h > 0) {
      const resultado = p / (h * h);
      setImc(resultado.toFixed(2));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de IMC</Text>
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (cm)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />
      <Button title="Calcular IMC" onPress={calcularIMC} />
      {imc && <Text style={{ marginTop: 10 }}>Tu IMC es: {imc}</Text>}
      <Button
        title="Ir a Cambio de Divisas"
        onPress={() => navigation.navigate("Divisas")}
      />
    </View>
  );
}

// Pantalla de Cambio de Divisas
function DivisasScreen({ navigation }) {
  const [cantidad, setCantidad] = useState("");
  const [resultado, setResultado] = useState(null);
  const tasa = 17; // 1 USD ≈ 17 MXN

  const convertir = () => {
    const c = parseFloat(cantidad);
    if (!isNaN(c)) {
      setResultado((c * tasa).toFixed(2));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambio de Divisas (USD → MXN)</Text>
      <TextInput
        style={styles.input}
        placeholder="Cantidad en USD"
        keyboardType="numeric"
        value={cantidad}
        onChangeText={setCantidad}
      />
      <Button title="Convertir" onPress={convertir} />
      {resultado && <Text style={{ marginTop: 10 }}>MXN: ${resultado}</Text>}
      <Button
        title="Ir a Cálculo de Propinas"
        onPress={() => navigation.navigate("Propinas")}
      />
    </View>
  );
}

// Pantalla de Propinas
function PropinasScreen({ navigation }) {
  const [total, setTotal] = useState("");
  const [propina, setPropina] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcularPropina = () => {
    const t = parseFloat(total);
    const p = parseFloat(propina);
    if (!isNaN(t) && !isNaN(p)) {
      const totalPropina = t + (t * p) / 100;
      setResultado(totalPropina.toFixed(2));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cálculo de Propinas</Text>
      <TextInput
        style={styles.input}
        placeholder="Total de la cuenta"
        keyboardType="numeric"
        value={total}
        onChangeText={setTotal}
      />
      <TextInput
        style={styles.input}
        placeholder="Porcentaje de propina (%)"
        keyboardType="numeric"
        value={propina}
        onChangeText={setPropina}
      />
      <Button title="Calcular Total con Propina" onPress={calcularPropina} />
      {resultado && <Text style={{ marginTop: 10 }}>Total: ${resultado}</Text>}
      <Button title="Volver al IMC" onPress={() => navigation.navigate("IMC")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "80%",
    padding: 10,
    marginBottom: 10,
  },
});

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
