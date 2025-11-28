import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Hola son Notificaciones" component={NotificacionScreen}/>
      <Drawer.Screen name="Hola son Ajustes" component={AjustesScreen}/>
    </Drawer.Navigator>
  );
}

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('Profile')}>
        Go to Profile
      </Button>
    </View>
  );
}

function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen</Text>
      <Button onPress={() => navigation.navigate('Home')}>Go to Home</Button>
    </View>
  );
}
function NotificacionScreen() {
  const navigation = useNavigation();

  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Notificaciones Pantalla</Text>
      <Button onPress={()=> navigation.navigate('Ajustes')}>Vamos a Ajustes</Button>
    </View>
  )}

function AjustesScreen() {
  const navigation = useNavigation();

  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Ajustes Pantalla</Text>
      <Button onPressIn={()=> navigation.navigate('Hola son Notificaciones')}>Vamos a Notificaciones</Button>
    </View>
  )}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
