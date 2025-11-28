import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { userToken,AuthProvider, AuthContext} from './AuthContext';
import React,{useContext} from 'react';
import { Button } from 'react-native-web';

function MainScreen() {
  const {userToken,login,logout} = useContext(AuthContext);

  return(
      <View style={styles.container}>
        <Text onPress={()=>login("token246")}>Logueate {userToken}</Text>
        <Button title="Logout" onPress={() => logout()} />
      </View>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <MainScreen/>
      
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
