import React,{useState} from "react";
import {StyleSheet,Text, View, Button,TextInput,Alert} from "react-native";
import{auth} from "./firebaseConfig";
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";

export default function App(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const[user,setUser]=useState(null);

  const handleLogin = async () => {
    try{
    const userCredential= await signInWithEmailAndPassword(auth,email,password);
    setUser(userCredential.user);
  } catch (error) {
    Alert.alert("Login Error", error.message);

  }
}

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
  }
  const handleSignUp = async () => {
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);

    }
    catch (error) {
      Alert.alert("Signup Error", error.message);
    }
  }

  const handleRefresh = async () =>{
    console.log("TOKEN ANTERIOR");
    console.log(user.stsTokenManager.accessToken);

    const nuevoAccesToken = await user.getIdToken(true);

    console.log("TOKEN NUEVO");
    console.log(user.stsTokenManager.accessToken)
  }

  return(
    <View style={styles.container}>
      {
        user ? (
          <>
          <Text style={styles.texto}>Bienvenido, {user.stsTokenManager.accessToken}</Text>
          <Button title="Abandonar sesión" onPress={handleLogout}/>
          <View style={{marginBottom:10}}/>
          <Button title="Refrescar" onPress={handleRefresh}/>
          
          </>
        ):(
          <>
          <Text style={styles.texto}>Autenticación con Firebase</Text>
          <TextInput
          style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            />
          <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          />
          <Button
          title="Acceder"
          onPress={handleLogin}
          />
          <View style={{marginBottom:5}}/>
          <Button
          title="Registrarse"
          onPress={handleSignUp}
          />
          </>

        )
      }
    </View>
  );
  

}

const styles=StyleSheet.create(
  {
    container:{
      flex:1,
      backgroundColor:"#a06b6bff",
      alignItems:"center",
      justifyContent:"center",
      padding:30,
    },
    input:{
      width:"100%",
      padding:10,
      marginBottom:10,
      borderWidth:1,
      borderColor:"#4905dbff",
      borderRadius:10,
      backgroundColor:"#9bc1d5ff",
    },
    texto:{
      fontSize:26,
      color:"#1100ffff",
    },

    },
);
