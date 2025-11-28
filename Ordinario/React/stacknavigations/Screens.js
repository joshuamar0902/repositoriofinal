import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from './AuthContext';

// --- PANTALLA DE LOGIN (No requiere token) ---

export const LoginScreen = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // En una app real, aquí validarías las credenciales con el backend.
        // Aquí simulamos un token basado en el nombre de usuario.
        if (username.length > 2 && password === '123') {
            login(`TOKEN_${username.toUpperCase()}_${new Date().getTime()}`);
        } else {
            alert("Credenciales inválidas. Usa 123 como contraseña.");
        }
    };

    return (
        <View style={styles.authContainer}>
            <Text style={styles.title}>INICIAR SESIÓN</Text>
            <TextInput
                style={styles.input}
                placeholder="Usuario"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
};

// --- PANTALLA 1: Menú Principal (Dashboard) ---

export const MainScreen = ({ setScreen }) => {
    const { logout } = useContext(AuthContext);

    return (
        <View style={styles.menuContainer}>
            <Text style={styles.menuTitle}>Menú de Aplicaciones</Text>
            <TouchableOpacity style={styles.menuButton} onPress={() => setScreen('Calculadora')}>
                <Text style={styles.buttonText}>1. Calculadora Simple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => setScreen('Nombre')}>
                <Text style={styles.buttonText}>2. Escribe tu Nombre</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => setScreen('Generador')}>
                <Text style={styles.buttonText}>3. Generador Aleatorio</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 40 }}>
                <Button title="CERRAR SESIÓN" onPress={logout} color="#FF5252" />
            </View>
        </View>
    );
};


// --- PANTALLA 2: Calculadora ---

export const CalculadoraScreen = ({ setScreen }) => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [result, setResult] = useState('');

    const calcular = (op) => {
        const n1 = parseFloat(num1 || 0);
        const n2 = parseFloat(num2 || 0);
        let res = 0;

        if (op === '+') res = n1 + n2;
        else if (op === '-') res = n1 - n2;
        else if (op === '*') res = n1 * n2;
        else if (op === '/') res = n1 / n2;

        setResult(res.toString());
    };

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.screenTitle}>Calculadora Simple</Text>
            <TextInput
                style={styles.input}
                placeholder="Número 1"
                keyboardType="numeric"
                value={num1}
                onChangeText={setNum1}
            />
            <TextInput
                style={styles.input}
                placeholder="Número 2"
                keyboardType="numeric"
                value={num2}
                onChangeText={setNum2}
            />
            <View style={styles.buttonRow}>
                <Button title=" + " onPress={() => calcular('+')} />
                <Button title=" - " onPress={() => calcular('-')} />
                <Button title=" * " onPress={() => calcular('*')} />
                <Button title=" / " onPress={() => calcular('/')} />
            </View>
            <Text style={styles.resultText}>Resultado: {result}</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => setScreen('Menu')}>
                <Text style={styles.backButtonText}>← Volver al Menú</Text>
            </TouchableOpacity>
        </View>
    );
};

// --- PANTALLA 3: Escribe tu Nombre ---

export const NombreScreen = ({ setScreen }) => {
    const [name, setName] = useState('');
    const [displayName, setDisplayName] = useState('');

    const imprimir = () => {
        setDisplayName(name);
    };

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.screenTitle}>Imprime tu Nombre</Text>
            <TextInput
                style={styles.input}
                placeholder="Escribe tu nombre aquí"
                value={name}
                onChangeText={setName}
            />
            <TouchableOpacity style={styles.primaryButton} onPress={imprimir}>
                <Text style={styles.buttonText}>Imprimir</Text>
            </TouchableOpacity>
            
            <Text style={styles.resultText}>
                {displayName ? `Hola, ${displayName}!` : 'Esperando nombre...'}
            </Text>
            <TouchableOpacity style={styles.backButton} onPress={() => setScreen('Menu')}>
                <Text style={styles.backButtonText}>← Volver al Menú</Text>
            </TouchableOpacity>
        </View>
    );
};

// --- PANTALLA 4: Generador Aleatorio ---

export const GeneradorScreen = ({ setScreen }) => {
    const [randomNumber, setRandomNumber] = useState(null);

    const generar = () => {
        const num = Math.floor(Math.random() * 100) + 1; // Genera entre 1 y 100
        setRandomNumber(num);
    };

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.screenTitle}>Generador de Número (1-100)</Text>
            <TouchableOpacity style={styles.primaryButton} onPress={generar}>
                <Text style={styles.buttonText}>Generar Número</Text>
            </TouchableOpacity>
            
            {randomNumber !== null && (
                <Text style={styles.randomNumberText}>
                    Número Generado: {randomNumber}
                </Text>
            )}
            <TouchableOpacity style={styles.backButton} onPress={() => setScreen('Menu')}>
                <Text style={styles.backButtonText}>← Volver al Menú</Text>
            </TouchableOpacity>
        </View>
    );
};


// --- ESTILOS ---

const styles = StyleSheet.create({
    authContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        width: '100%',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    loginButton: {
        width: '80%',
        padding: 15,
        backgroundColor: '#007BFF',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    // Estilos del Menú
    menuContainer: {
        flex: 1,
        paddingTop: 80,
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
    },
    menuTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#333',
    },
    menuButton: {
        width: '70%',
        padding: 18,
        backgroundColor: '#28A745',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    // Estilos de Pantallas Internas
    screenContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 80,
        backgroundColor: '#f9f9f9',
        width: '100%',
    },
    screenTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#007BFF',
    },
    primaryButton: {
        padding: 15,
        backgroundColor: '#007BFF',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        width: '60%',
    },
    resultText: {
        fontSize: 20,
        marginTop: 30,
        fontWeight: '600',
        color: '#333',
    },
    randomNumberText: {
        fontSize: 32,
        marginTop: 30,
        fontWeight: 'bold',
        color: '#DC3545',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
        marginBottom: 20,
        marginTop: 10,
    },
    backButton: {
        marginTop: 50,
    },
    backButtonText: {
        color: '#6C757D',
        fontSize: 16,
    }
});
