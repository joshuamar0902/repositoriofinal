import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
      style={styles.fondo}
      source={{uri:'https://i.pinimg.com/1200x/6e/24/70/6e24704de5836a61b1be9cb4977e27fa.jpg'}}
      >
      <Text>Demo Imagen</Text>
      <Image
      style={styles.foto}
      source={require('./assets/favicon.png')}
      />
      <Image
      style={styles.foto}
      source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ0_9CCMqd_9WV0dD22XoHUMmxqVjLKEOvIA&s'}}
      />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foto:{
    width: 200,
    height: 200,
  },
  fondo:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignContent: 'center',
    alignItems: 'center',
  
  }
});
