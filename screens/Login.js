import React, {useState, useContext, useEffect} from 'react';
import {Container, Button, Text, Content, Item, Input, Form, Spinner} from 'native-base'
import {StyleSheet, Image, View} from "react-native";
import {UserContext} from "../context/userContext";
import axios from 'axios'
import {withNavigation} from 'react-navigation'
import {API_URL} from "../constants";

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    let userContext = useContext(UserContext);

    useEffect(()=>{
        if (userContext.state.isAuthenticated){
            props.navigation.navigate('App')
        }
    }, [userContext.state])




    const handleLogin = () =>{
        setLoading(true)
        setError(false)
        let body = {
            username:email,
            password:password
        }
        axios.post(API_URL+'accounts/api-token-auth/',body)
            .then(res=>{
                userContext.dispatch({ type: "login", payload:{user:res.data.user,token:res.data.token} })
            })
            .catch(error=>{
                setError(true)
                setLoading(false)
            })
    }


    return (
        <Container style={styles.container}>
            <Content>
                <View>
                    <Image
                        source={require('../assets/arclight_logo.png')}
                        style={styles.image}
                    />
                </View>
                <Form style={styles.form}>
                    <Item style={styles.item}>
                        <Input
                            placeholder="Email"
                            value={email}
                            onChangeText={(text)=>{setEmail(text)}}
                        />
                    </Item>
                    <Item last style={styles.item}>
                        <Input
                            placeholder="Password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text)=>{setPassword(text)}}
                            onSubmitEditing={handleLogin}
                        />
                    </Item>
                    <Button onPress={handleLogin} style={styles.button} disabled={loading}>
                        {loading ?
                            <Spinner color='white'/>
                            :
                            <Text>
                                Login
                            </Text>
                        }
                    </Button>
                    {
                        error &&
                        <View>
                            <Text style={styles.centeredText}>
                                Your email and password didn't match.
                            </Text>
                            <Text style={styles.centeredText}>
                                Please try again.
                            </Text>
                        </View>
                    }
                </Form>
                <Text style={styles.link} onPress={()=>{
                    props.navigation.navigate('ForgotPassword')}}>
                    Forgot Password?
                </Text>
            </Content>
        </Container>
    );
};


const styles = StyleSheet.create({
    container: {
        padding:10,
    },
    centeredText:{
        textAlign:'center',
        marginTop: 10
    },
    image:{
        width:'100%',
        height:100,
        resizeMode:'contain',
        marginTop:100
    },
    form:{
        marginTop:50
    },
    item:{
        marginBottom:30
    },
    button:{
        justifyContent:'center',
    },
    link:{
        textAlign: 'center',
        marginTop:50,
        textDecorationLine:'underline',
        padding:20
    }
});

export default withNavigation(Login);
