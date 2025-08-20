import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mensaje, setMensaje] = useState('');
  const login = () => {
    if (usuario =="joshua" && contrasena=="1234") {
      setMensaje(" Bienvenido Joshua Marin");
      
    } else {
      setMensaje(" Usuario o contraseña incorrecta");
      
    }
    };
  return (
    <View style={styles.container}>
      <Text>LOGIN</Text>
      <TextInput 
      
      style={styles.input}
      placeholder='Escribe tu usuario'
      value={usuario}
      onChangeText={(t) => setUsuario(t)}

      />
      <TextInput 
      style={styles.input}
      placeholder='Escribe tu contraseña'
      value={contrasena}
      onChangeText={(t) => setContrasena(t)}

      />
      <Button title='Ingresar' onPress={login}
      />

      {mensaje !== '' && <Text style={styles.mensaje}>{mensaje}</Text>}

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    height:50,
    width:200,
    marginBottom:10,
    backgroundColor:'#ccc',
    borderBottomColor:'#978484ff',
    borderBottomWidth:1,
  },
});
