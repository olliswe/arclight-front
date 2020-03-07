import React, {useEffect, useState, Fragment, useContext} from 'react';
import { StyleSheet} from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {  Text, Container, Drawer } from 'native-base';
import withUserContext from "./higher_order_components/UserContextWrapper";
import AppContainer from "./navigation";
import {Linking} from 'expo'
import {API_URL} from "./constants";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import {UserContext, UserContextProps} from "./context/userContext";

console.disableYellowBox = true;

const App = () => {

  let userContext:UserContextProps = useContext(UserContext)


  const client = new ApolloClient({
    uri: API_URL+'graphql/', // your GraphQL Server
    request: (operation) => {
      const token = userContext.state.token;
      operation.setContext({
        headers: {
          authorization: token ? `Token ${token}` : ''
        }
      })
    }
  });

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

  const prefix = Linking.makeUrl('/');
  console.log(prefix)



  return (
        loading ?
            <Container style={styles.container}>
              <Text>Loading...</Text>
            </Container>
            :
            <ApolloProvider client={client}>
              <AppContainer uriPrefix={prefix} />
            </ApolloProvider>
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




