import React, {useContext, useEffect} from 'react';
import {Text, Button} from 'native-base'
import {UserContext} from "../context/userContext";
import {withNavigation} from 'react-navigation'

const LogoutButton = (props) => {

    let userContext = useContext(UserContext)

    useEffect(()=>{
        if (!userContext.state.isAuthenticated){
            props.navigation.navigate('Auth')
        }

    },[userContext.state.isAuthenticated])

    const handleLogout = () => {
        userContext.dispatch({type:'logout'})
    }

    return (
        <Button onPress={handleLogout}>
            <Text>
                Logout
            </Text>
        </Button>
    );
};

export default withNavigation(LogoutButton);
