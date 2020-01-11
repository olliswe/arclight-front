import React, {useState, useContext, useEffect} from 'react';
import {Container, Button, Text, Content, Item, Input, Form} from 'native-base'
import {StyleSheet, Image, View} from "react-native";
import {UserContext} from "../context/userContext";
import axios from 'axios'

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
        axios.post(process.env.API_URL+'accounts/api-token-auth/',body)
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
                <View style={styles.imageView}>
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
                        />
                    </Item>
                    <Button onPress={handleLogin} style={styles.button}>
                        <Text>
                            Login
                        </Text>
                    </Button>
                    {
                        error &&
                        <Container style={styles.container}>
                            <Text style={styles.centeredText}>
                                Your email and password didn't match.
                            </Text>
                            <Text style={styles.centeredText}>
                                Please try again.
                            </Text>
                        </Container>

                    }
                </Form>
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
      marginBottom: 10
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
    }
});

export default Login;
