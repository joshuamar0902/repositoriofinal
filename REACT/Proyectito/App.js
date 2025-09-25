import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "17b1208e77a82d912155adda8feadd9d"; // tu API Key de OpenWeather

  const getWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setWeather({ error: "Ciudad no encontrada" });
      } else {
        setWeather({
          name: data.name,
          temp: data.main.temp,
          desc: data.weather[0].description,
        });
      }
    } catch (error) {
      setWeather({ error: "Error al obtener datos" });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌤️ Clima App</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe una ciudad"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Buscar Clima" onPress={getWeather} />

      {weather && (
        <View style={styles.result}>
          {weather.error ? (
            <Text style={styles.error}>{weather.error}</Text>
          ) : (
            <>
              <Text style={styles.city}>{weather.name}</Text>
              <Text style={styles.temp}>{weather.temp}°C</Text>
              <Text style={styles.desc}>{weather.desc}</Text>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f0f8ff" },
  title: { fontSize: 24, marginBottom: 20, fontWeight: "bold" },
  input: { borderWidth: 1, padding: 10, width: "80%", marginBottom: 10, borderRadius: 5 },
  result: { marginTop: 20, alignItems: "center" },
  city: { fontSize: 22, fontWeight: "bold" },
  temp: { fontSize: 28, marginVertical: 5 },
  desc: { fontSize: 18, fontStyle: "italic" },
  error: { color: "red", fontSize: 16 }
});
