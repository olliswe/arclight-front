import React, {useState} from 'react';
import {Button, Container, Content, Form, Input, Item, Spinner, Text} from "native-base";
import {Image, StyleSheet, View} from "react-native";
import {withNavigation} from 'react-navigation'
import axios from 'axios'
import {API_URL} from "../constants";

const ResetPassword = (props) => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [passwordOne, setPasswordOne] = useState('')
    const [passwordTwo, setPasswordTwo] = useState('')

    const token = props.navigation.getParam('token')

    const handleReset = () => {
        setLoading(true)
        setSuccess(false)
        setError(false)
        let body = {
            token:token,
            password:passwordOne
        }
        axios.post(API_URL+'accounts/password_reset/confirm/', body)
            .then(res=>{
                setLoading(false)
                setSuccess(true)
            })
            .catch(error => {
                setError(true)
                setLoading(false)
                setPasswordOne('')
                setPasswordTwo('')
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
                {success ?
                    <Text style={styles.centeredText}>
                        Success! Your password was reset.
                    </Text>
                    :
                    <Form style={styles.form}>
                        <Text style={styles.item}>
                            Reset your password by creating a new one:
                        </Text>
                        <Item style={styles.item}>
                            <Input
                                placeholder="New Password"
                                value={passwordOne}
                                secureTextEntry={true}
                                onChangeText={(text) => setPasswordOne(text)}
                            />
                        </Item>
                        <Item style={styles.item}>
                            <Input
                                placeholder="Repeat Password"
                                value={passwordTwo}
                                secureTextEntry={true}
                                onChangeText={(text) => setPasswordTwo(text)}
                            />
                        </Item>
                        <Button style={styles.button} disabled={loading || passwordOne!==passwordTwo || passwordOne===''} onPress={handleReset}>
                            {loading ?
                                <Spinner color='white'/>
                                :
                                <Text>
                                    Reset Password
                                </Text>
                            }
                        </Button>
                        {(passwordOne!==passwordTwo && passwordOne!=='') &&
                        <Text style={styles.centeredText}>
                            The passwords do not match!
                        </Text>
                        }
                    </Form>
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

export default withNavigation(ResetPassword);
