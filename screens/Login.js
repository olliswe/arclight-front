import React from 'react';
import {Container, Button, Text} from 'native-base'

const Login = (props) => {
    return (
        <Container>
            <Button onPress={()=>{props.navigation.navigate('App')}}>
                <Text>
                    Login
                </Text>
            </Button>
        </Container>
    );
};

export default Login;
