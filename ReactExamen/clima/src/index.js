import {
    View, Text, Alert, SafeAreaView, StyleSheet,
    ActivityIndicator, ScrollView, RefreshControl, Image, FlatList,
    TouchableOpacity, Platform, ImageBackground
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import LottieView from 'lottie-react-native';

const openWeatherKey = '17b1208e77a82d912155adda8feadd9d';

const Weather = () => {
    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const loadForecast = async () => {
        setRefreshing(true);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permission to access location was denied");
                return;
            }

            const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
            
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${openWeatherKey}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
            );
            
            const data = await response.json();

            if (!response.ok) {
                Alert.alert("Error", `Could not load weather: ${data.message}`);
            } else {
                setForecast(data);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "An error occurred while fetching data.");
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadForecast();
    }, []);

    const getWeatherAnimation = (weather) => {
        // Usamos un archivo de carga por si acaso, puedes descargarlo de LottieFiles
        if (!weather) return require('../assets/sunny.json'); 
        
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

    if (!forecast) {
        return (
            <SafeAreaView style={styles.loading}>
                <ActivityIndicator size="large" color="#C84B31" />
            </SafeAreaView>
        );
    }

    if (!forecast.list || forecast.list.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text>No se encontró un pronóstico para esta ubicación.</Text>
                </View>
            </SafeAreaView>
        );
    }

    const currentWeather = forecast.list[0];

    return (
        <ImageBackground 
            source={require('../assets/background.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
            blurRadius={10}
        >
            <SafeAreaView style={styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={loadForecast} />
                    }
                >
                    <View style={styles.content}>
                        <Text style={styles.title}>Clima Actual</Text>
                        <Text style={styles.location}>{forecast.city.name}</Text>
                        
                        <View style={styles.currentWeather}>
                            <LottieView
                                source={getWeatherAnimation(currentWeather.weather[0].main)}
                                style={styles.largeIcon}
                                autoPlay
                                loop
                            />
                            <Text style={styles.currentTemp}>{Math.round(currentWeather.main.temp)}°C</Text>
                        </View>

                        <Text style={styles.currentDescription}>{currentWeather.weather[0].description}</Text>
                        
                        {/* --- TU SECCIÓN DE INFO ADICIONAL --- */}
                        <View style={styles.extraInfo}>
                            <View style={styles.infoBox}>
                                <Image source={require('../assets/temp.png')} style={styles.infoIcon}/>
                                <View>
                                    <Text style={styles.infoText}>{Math.round(currentWeather.main.feels_like)}°C</Text>
                                    <Text style={styles.infoLabel}>Sensación</Text>
                                </View>
                            </View>
                            <View style={styles.infoBox}>
                                <Image source={require('../assets/humedad.png')} style={styles.infoIcon}/>
                                <View>
                                    <Text style={styles.infoText}>{currentWeather.main.humidity}%</Text>
                                    <Text style={styles.infoLabel}>Humedad</Text>
                                </View>
                            </View>
                        </View>
                        
                        <View style={styles.hourlyContainer}>
                            <Text style={styles.subtitle}>Pronóstico por Horas</Text>
                            <FlatList
                                horizontal
                                data={forecast.list.slice(0, 16)}
                                keyExtractor={(item, index) => index.toString()}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.flatListContent}
                                renderItem={({ item }) => {
                                    const dt = new Date(item.dt * 1000);
                                    const onHourPress = () => {
                                        const details = `Temperatura: ${Math.round(item.main.temp)}°C\nSensación: ${Math.round(item.main.feels_like)}°C\nHumedad: ${item.main.humidity}%\nClima: ${item.weather[0].description}`;
                                        Alert.alert(`Detalles de las ${dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, details);
                                    };
                                    return (
                                        <TouchableOpacity onPress={onHourPress} style={styles.hour}>
                                            <Text style={styles.hourText}>{dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                            <LottieView
                                                source={getWeatherAnimation(item.weather[0].main)}
                                                style={styles.smallIcon}
                                                autoPlay
                                                loop
                                            />
                                            <Text style={styles.hourText}>{Math.round(item.main.temp)}°C</Text>
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

export default Weather;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1 
        },
    container: { 
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)'
        },
    loading: {
        flex: 1,
        backgroundColor: '#ECDBBA',
        alignItems: 'center',
        justifyContent: 'center'
        },
    content: {
        alignItems: 'center',
        paddingVertical: 20
        },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10
        },
    location: { 
        fontSize: 18,
        color: 'white',
        marginBottom: 20
        },
    currentWeather: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
        },
    largeIcon: {
        width: 200,
        height: 200
        },
    currentTemp: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white'
        },
    currentDescription: {
        fontSize: 24,
        textTransform: 'capitalize',
        color: 'white',
        marginBottom: 20
        },
    extraInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        marginBottom: 20
        },
    infoBox: {
        alignItems: 'center',
        flexDirection: 'row'
        },
    infoIcon: {
        width: 40,
        height: 40,
        marginRight: 10
        },
    infoText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
        },
    infoLabel: {
        fontSize: 14,
        color: '#eee',
        textAlign: 'center'
        },
    hourlyContainer: {
        width: '100%'
        },
    subtitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
        alignSelf: 'flex-start',
        marginLeft: 20
        },
    hour: { 
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 10,
        marginHorizontal: 5,
        width: 100,
        justifyContent: 'space-around',
        height: 150,
        ...Platform.select({ web: { cursor: 'pointer' } })
        },
    hourText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16
        },
    smallIcon: {
        width: 80,
        height: 80
        },
    flatListContent: {
        paddingHorizontal: 10
        },
});