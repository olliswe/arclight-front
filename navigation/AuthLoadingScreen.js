import React, {useContext, useEffect} from 'react';
import {UserContext} from "../context/userContext";
import {Container, Text} from 'native-base'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import {API_URL} from "../constants";

const AuthLoadingScreen = (props) => {

    const context = useContext(UserContext)


    const getUserData = async() => {

        const userToken = await SecureStore.getItemAsync('token');
        if (!!userToken){
            let headers = {'Authorization':'Token '+userToken}
            axios.get(API_URL+'accounts/current_user/', {headers:headers})
                .then(res=>{
                    console.log('user can be logged in!')
                    context.dispatch({type:'login', payload:{user:res.data,token:userToken}})
                })
                .catch(error=>{
                    alert('An error occurred, please try again!')
                    context.dispatch({type:'loaded'})
                })
        }
        else{
            context.dispatch({type:'loaded'})
        }
    }


    useEffect(()=>{
        getUserData()
    },[])

    useEffect(()=>{
        if (!context.state.loading){
            props.navigation.navigate(context.state.isAuthenticated ? 'App' : 'Auth')
        }
    },[context.state])


    return (
        <Container>
            <Text>
                Loading...
            </Text>
        </Container>
    );
};

export default AuthLoadingScreen;
