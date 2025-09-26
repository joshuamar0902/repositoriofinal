// src/CurrentWeatherCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CurrentWeatherCard = ({ currentWeather, locationName }) => {
    const weatherDetails = currentWeather.weather[0];

    return (
        <>
            <Text style={styles.title}>Clima Actual</Text>
            <Text style={styles.location}>{locationName}</Text>
            
            <View style={styles.currentWeather}>
                <Image
                    style={styles.largeIcon}
                    source={{ uri: `https://openweathermap.org/img/wn/${weatherDetails.icon}@4x.png` }}
                />
                <Text style={styles.currentTemp}>{Math.round(currentWeather.main.temp)}°C</Text>
            </View>

            <Text style={styles.currentDescription}>{weatherDetails.description}</Text>
        </>
    );
};

const styles = StyleSheet.create({
    title: { fontSize: 36, fontWeight: 'bold', color: '#C84B31', marginBottom: 10 },
    location: { fontSize: 18, color: '#333', marginBottom: 20 },
    currentWeather: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    largeIcon: { width: 150, height: 150 },
    currentTemp: { fontSize: 48, fontWeight: 'bold', color: '#333' },
    currentDescription: { fontSize: 24, textTransform: 'capitalize', color: '#333', marginBottom: 30 },
});

export default CurrentWeatherCard;