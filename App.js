import React, {useEffect, useState, Fragment, useRef} from 'react';
import { StyleSheet} from 'react-native';
import RecVideo from "./pages/RecVideo";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {  Text, Container, Drawer } from 'native-base';
import withUserContext from "./higher_order_components/UserContextWrapper";

const App = () => {

  const [loading, setLoading] = useState(true)

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


  return (
        loading ?
            <Container>
              <Text>Loading...</Text>
            </Container>
            :
              <RecVideo test={'hello'} />
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




