import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Estado para mostrar pantalla de carga

    // 🌟 CLAVE ÚNICA para AsyncStorage
    const STORAGE_KEY = 'userToken'; 

    const login = async (token) => {
        setIsLoading(true);
        setUserToken(token);
        // Usar la clave única y correcta para almacenar
        await AsyncStorage.setItem(STORAGE_KEY, token);
        setIsLoading(false);
    };

    const logout = async () => {
        setIsLoading(true);
        setUserToken(null);
        // Usar la clave única y correcta para eliminar
        await AsyncStorage.removeItem(STORAGE_KEY);
        setIsLoading(false);
    };

    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem(STORAGE_KEY);
            if (token) {
                setUserToken(token);
            }
        } catch (e) {
            console.error('Error checking token:', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(
        () => {
            checkToken();
        }, []
    );

    // Opcional: Mostrar un spinner mientras se verifica el token inicial
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Cargando sesión...</Text>
            </View>
        );
    }

    return (
        <AuthContext.Provider value={{ userToken, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Se agregó el View y Text para que el código compile
import { View, Text } from 'react-native';
