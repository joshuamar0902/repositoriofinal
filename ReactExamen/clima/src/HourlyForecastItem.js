// src/HourlyForecastItem.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const HourlyForecastItem = ({ item }) => {
    const weatherIcon = item.weather[0];
    const dt = new Date(item.dt * 1000);

    return (
        <View style={styles.hour}>
            <Text style={styles.hourText}>
                {dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
            <Image
                style={styles.smallIcon}
                source={{ uri: `https://openweathermap.org/img/wn/${weatherIcon.icon}@2x.png` }}
            />
            <Text style={styles.hourText}>{Math.round(item.main.temp)}°C</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    hour: { 
        padding: 10, 
        alignItems: 'center', 
        backgroundColor: 'rgba(255, 255, 255, 0.3)', 
        borderRadius: 10, 
        marginHorizontal: 5,
        width: 100,
        justifyContent: 'space-around',
        height: 140,
    },
    hourText: { fontWeight: 'bold', color: '#346751', fontSize: 16 },
    smallIcon: { width: 60, height: 60 },
});

export default HourlyForecastItem;