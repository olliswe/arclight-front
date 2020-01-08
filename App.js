import React, {useEffect, useState, Fragment, useRef} from 'react';
import { StyleSheet} from 'react-native';
import RecVideo from "./RecVideo";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {  Text, Container, Drawer } from 'native-base';
import AppHeader from "./components/Header";
import AppFooter from "./components/Footer";


export default function App() {

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

  const drawer = useRef()

  const closeDrawer = () => {
    drawer.current._root.close()
  };

  const openDrawer = () => {
    drawer.current._root.open()
  };

  return (
        loading ?
            <Container>
              <Text>Loading...</Text>
            </Container>
            :
            <Drawer
                ref={drawer}
                content={<Container><Text>Drawer..</Text></Container>}
                onClose={() => closeDrawer()}
            >
              <AppHeader openDrawer={openDrawer}/>
              <RecVideo/>
              <AppFooter/>
            </Drawer>
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




