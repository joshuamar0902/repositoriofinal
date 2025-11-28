import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'; // Importar TouchableOpacity
import { AuthProvider, AuthContext } from './AuthContext';
import { LoginScreen, MainScreen, CalculadoraScreen, NombreScreen, GeneradorScreen } from './Screens';

// Componente para manejar la navegación interna (después del login)
const AuthenticatedApp = () => {
    const { userToken } = useContext(AuthContext);
    const [currentScreen, setCurrentScreen] = useState('Menu'); // Estado para la navegación interna

    // Mapa de pantallas
    const screenMap = {
        'Menu': <MainScreen setScreen={setCurrentScreen} />,
        'Calculadora': <CalculadoraScreen setScreen={setCurrentScreen} />,
        'Nombre': <NombreScreen setScreen={setCurrentScreen} />,
        'Generador': <GeneradorScreen setScreen={setCurrentScreen} />,
    };

    // Si por alguna razón el token se pierde aquí, forzamos la vuelta a Login
    if (!userToken) {
        return <LoginScreen />;
    }

    // Renderiza la pantalla actual
    return (
        <View style={styles.appContainer}>
            {screenMap[currentScreen]}
        </View>
    );
};

// Componente principal de la aplicación
export default function App() {
    return (
        <AuthProvider>
            <StatusBar style="auto" />
            <RootNavigator />
        </AuthProvider>
    );
}

// Componente que chequea el estado de autenticación y renderiza la pantalla base
const RootNavigator = () => {
    const { userToken, isLoading } = useContext(AuthContext);
    // 🌟 ESTADO DE PRUEBA ELIMINADO 🌟

    // Muestra una pantalla de carga mientras se recupera el token
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={{ fontSize: 18 }}>Cargando datos de sesión...</Text>
            </View>
        );
    }
    
    // 🌟 LÓGICA FINAL: Muestra la App si hay token, sino muestra Login.
    const isAuthenticated = userToken;

    return (
        <View style={styles.fullScreenContainer}>
            {/* Botón de prueba para desarrolladores ELIMINADO */}

            {/* Renderizado Condicional */}
            {isAuthenticated ? <AuthenticatedApp /> : <LoginScreen />}
        </View>
    );
};


const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        // paddingTop: 0, // Se elimina el padding superior de 40px
    },
    appContainer: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    // Estilos de botón de prueba ELIMINADOS
});
