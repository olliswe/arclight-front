import React, {useState} from 'react';
import {Container, Input, Row, Grid, Text, Content, Form, Item, Button, Spinner} from 'native-base'
import {withNavigation} from 'react-navigation'
import {Image, StyleSheet, View} from "react-native";
import axios from 'axios'
import { Linking } from 'expo';
import {API_URL} from "../constants";

const ForgotPassword = (props) => {

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)
    const [email, setEmail] = useState('')

    const handleForgot = () => {
        setLoading(true)
        setSuccess(false)
        setError(null)
        let url = Linking.makeUrl('auth/password_reset')
        let body = {email:email, url:url}
        axios.post(API_URL+'accounts/password_reset/',body)
            .then(res=>{
                setLoading(false)
                setSuccess(true)
                console.log(res)
                }
            )
            .catch(error=>{
                setLoading(false)
                setError(error)
                console.log(error)
                }
            )
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
                            placeholder="Type your Email"
                            value={email}
                            onChangeText={(text)=>setEmail(text)}
                        />
                    </Item>
                    <Button style={styles.button} onPress={handleForgot} disabled={loading}>
                        {loading ?
                            <Spinner color='white'/>
                            :
                            <Text>
                               Send Password Reset Email
                            </Text>
                        }
                    </Button>
                </Form>
                {error &&
                <Text style={styles.message}>
                    Error: We don't seem to have that email registered in our database.
                </Text>
                }
                {success &&
                <Text style={styles.message}>
                    Success! A password reset email was sent to your email.
                </Text>
                }
                <Text style={styles.link} onPress={()=>{
                    props.navigation.navigate('Login')}}>
                    Return to Login screen
                </Text>
            </Content>
        </Container>
    );
};


const styles = StyleSheet.create({
    button:{
        justifyContent:'center',
    },
    container: {
        padding: 10,
    },
    centeredText: {
        textAlign: 'center',
        marginTop: 10
    },
    item:{
        marginBottom:30
    },
    image: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        marginTop: 100
    },
    form: {
        marginTop: 50
    },
    link:{
        textAlign: 'center',
        marginTop:50,
        textDecorationLine:'underline',
        padding:20
    },
    message:{
        textAlign:'center',
        marginTop:25
    }
})

export default withNavigation(ForgotPassword);
