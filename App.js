import React, {useEffect, useState, Fragment, useRef} from 'react';
import { StyleSheet} from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {  Text, Container, Drawer } from 'native-base';
import withUserContext from "./higher_order_components/UserContextWrapper";
import AppContainer from "./navigation";
import {Linking} from 'expo'
import {API_URL} from "./constants";

// Remove Comments if you want to display warnings
console.disableYellowBox = true;

const App = () => {

  const [loading, setLoading] = useState(true)

  const getInititalLink = async() =>{
    Linking.getInitialURL
  }

  const loadFont = async() => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
  }

  useEffect(()=> {
    loadFont()
        .then(res=>{setLoading(false)})
  })

  const prefix = Linking.makeUrl('/');
  console.log(prefix)



  return (
        loading ?
            <Container>
              <Text>Loading...</Text>
            </Container>
            :
            <AppContainer uriPrefix={prefix} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withUserContext(App)




