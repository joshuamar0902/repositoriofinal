// --- 1. IMPORTACIONES ---
// Importamos los bloques de construcción visuales desde la librería de React Native.
import {
    View, Text, Alert, SafeAreaView, StyleSheet,
    ActivityIndicator, ScrollView, RefreshControl, Image, FlatList,
    TouchableOpacity, Platform, ImageBackground
} from 'react-native';
// Importamos el núcleo de React y los "Hooks" (useState, useEffect) que le dan funcionalidad a nuestro componente.
import React, { useEffect, useState } from 'react';
// Importamos la librería de Expo para acceder a la ubicación del dispositivo.
import * as Location from 'expo-location';
// Importamos la librería Lottie para poder mostrar animaciones en lugar de imágenes estáticas.
import LottieView from 'lottie-react-native';

// --- 2. CONSTANTES ---
// Guardamos nuestra clave de la API en una constante para no tener que escribirla varias veces.
const openWeatherKey = '17b1208e77a82d912155adda8feadd9d';

// --- 3. DEFINICIÓN DEL COMPONENTE PRINCIPAL ---
// 'Weather' es un componente funcional. Todo lo que está dentro es parte de nuestra aplicación.
const Weather = () => {
    // --- 4. ESTADO DEL COMPONENTE (LA MEMORIA) ---
    // Creamos una variable de estado llamada 'forecast'. Empezará siendo 'null'.
    // Usaremos 'setForecast' para guardar los datos del clima cuando lleguen.
    const [forecast, setForecast] = useState(null);
    
    // Creamos otra variable de estado, 'refreshing', para saber si el usuario está deslizando para actualizar.
    const [refreshing, setRefreshing] = useState(false);

    // --- 5. FUNCIÓN PRINCIPAL DE LÓGICA ---
    // 'loadForecast' es una función asíncrona (async) porque tiene que esperar respuestas externas.
    const loadForecast = async () => {
        // Al iniciar la carga, activamos el indicador de refresco.
        setRefreshing(true);
        // Usamos un bloque try/catch para manejar cualquier error que pueda ocurrir.
        try {
            // Esperamos (await) a que el usuario nos dé permiso para acceder a su ubicación.
            const { status } = await Location.requestForegroundPermissionsAsync();
            // Si el permiso no fue concedido...
            if (status !== 'granted') {
                // ...mostramos una alerta y detenemos la ejecución de la función.
                Alert.alert("Permission to access location was denied");
                return;
            }

            // Si tenemos permiso, esperamos a obtener las coordenadas actuales del GPS.
            const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
            
            // Usamos las coordenadas para construir la URL y esperamos la respuesta de la API del clima.
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${openWeatherKey}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
            );
            
            // Esperamos a que la respuesta se convierta a formato JSON.
            const data = await response.json();

            // Verificamos si la respuesta de la API fue exitosa.
            if (!response.ok) {
                // Si no fue exitosa, mostramos una alerta con el mensaje de error de la API.
                Alert.alert("Error", `Could not load weather: ${data.message}`);
            } else {
                // Si fue exitosa, guardamos los datos en nuestro estado 'forecast'. ESTO ACTUALIZA LA PANTALLA.
                setForecast(data);
            }
        } catch (error) {
            // Si ocurre cualquier otro error (ej. no hay internet), lo mostramos en la consola...
            console.error(error);
            // ...y le mostramos una alerta genérica al usuario.
            Alert.alert("Error", "An error occurred while fetching data.");
        } finally {
            // Este bloque se ejecuta siempre, haya habido éxito o error.
            // Nos aseguramos de desactivar el indicador de refresco.
            setRefreshing(false);
        }
    };

    // --- 6. EFECTO DE INICIO ---
    // useEffect se ejecuta cuando el componente se monta en la pantalla.
    useEffect(() => {
        // Llama a nuestra función principal para cargar el clima por primera vez.
        loadForecast();
    }, []); // El arreglo vacío `[]` asegura que esto se ejecute solo una vez.

    // --- 7. FUNCIÓN AUXILIAR PARA ANIMACIONES ---
    // Esta función recibe el estado del clima (ej. "Clouds") y devuelve el archivo de animación correcto.
    const getWeatherAnimation = (weather) => {
        if (!weather) return require('../assets/sunny.json'); // Una animación por defecto si no hay datos
        
        // Un 'switch' es como una serie de 'if/else' para elegir una opción.
        switch (weather) {
            case 'Clouds':
                return require('../assets/sunclouds.json');
            case 'Rain':
            case 'Drizzle':
            case 'Thunderstorm':
                return require('../assets/rainy.json');
            case 'Snow':
                return require('../assets/snowy.json');
            case 'Clear':
                return require('../assets/sunny.json');
            default:
                return require('../assets/sunny.json');
        }
    };

    // --- 8. RENDERIZADO CONDICIONAL ---
    // Si el estado 'forecast' todavía es nulo, significa que estamos esperando la respuesta de la API.
    if (!forecast) {
        // Por lo tanto, mostramos un indicador de carga y nada más.
        return (
            <SafeAreaView style={styles.loading}>
                <ActivityIndicator size="large" color="#C84B31" />
            </SafeAreaView>
        );
    }

    // Si ya recibimos datos, pero la lista de pronósticos está vacía, mostramos un mensaje de error.
    if (!forecast.list || forecast.list.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text>No se encontró un pronóstico para esta ubicación.</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Si pasamos las verificaciones, extraemos el primer elemento de la lista (el clima actual).
    const currentWeather = forecast.list[0];

    // --- 9. RENDERIZADO PRINCIPAL (LO QUE SE VE EN PANTALLA) ---
    // 'return' define la estructura visual del componente.
    return (
        // Usamos ImageBackground para poner una imagen de fondo que cubra toda la pantalla.
        <ImageBackground 
            source={require('../assets/background.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
            blurRadius={10}
        >
            {/* SafeAreaView asegura que nuestro contenido no quede oculto por el notch o barras del sistema. */}
            <SafeAreaView style={styles.container}>
                {/* ScrollView permite que el contenido sea más largo que la pantalla y se pueda deslizar. */}
                <ScrollView
                    // RefreshControl añade la funcionalidad de "deslizar para actualizar".
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={loadForecast} />
                    }
                >
                    {/* View es el contenedor principal de nuestro contenido. */}
                    <View style={styles.content}>
                        <Text style={styles.title}>Clima Actual</Text>
                        <Text style={styles.location}>{forecast.city.name}</Text>
                        
                        <View style={styles.currentWeather}>
                            {/* LottieView muestra la animación del clima que elige nuestra función auxiliar. */}
                            <LottieView
                                source={getWeatherAnimation(currentWeather.weather[0].main)}
                                style={styles.largeIcon}
                                autoPlay
                                loop
                            />
                            <Text style={styles.currentTemp}>{Math.round(currentWeather.main.temp)}°C</Text>
                        </View>

                        <Text style={styles.currentDescription}>{currentWeather.weather[0].description}</Text>
                        
                        {/* Esta sección muestra la información adicional de sensación y humedad. */}
                        <View style={styles.extraInfo}>
                            {/* ... (Contenido de Sensación y Humedad) ... */}
                        </View>
                        
                        {/* Contenedor para el pronóstico por horas. */}
                        <View style={styles.hourlyContainer}>
                            <Text style={styles.subtitle}>Pronóstico por Horas</Text>
                            {/* FlatList es un componente optimizado para mostrar listas. */}
                            <FlatList
                                horizontal // La hacemos horizontal.
                                data={forecast.list.slice(0, 16)} // Le pasamos los primeros 16 elementos de la lista de pronósticos.
                                keyExtractor={(item, index) => index.toString()} // Un identificador único para cada elemento.
                                showsHorizontalScrollIndicator={false} // Oculta la barra de scroll.
                                contentContainerStyle={styles.flatListContent} // Estilos para el contenedor de la lista.
                                // 'renderItem' es una función que se ejecuta por cada elemento de la lista.
                                renderItem={({ item }) => {
                                    // ... (lógica para formatear la hora y manejar el clic)
                                    return (
                                        // Cada elemento es un TouchableOpacity para hacerlo interactivo.
                                        <TouchableOpacity onPress={onHourPress} style={styles.hour}>
                                            {/* ... (el contenido de cada recuadro: hora, animación y temperatura) ... */}
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

// Se exporta el componente para que pueda ser usado en otras partes de la app (como en App.js).
export default Weather;

// 'StyleSheet.create' es la forma optimizada de definir los estilos de nuestro componente.
const styles = StyleSheet.create({
    // ... (todas tus definiciones de estilo)
});