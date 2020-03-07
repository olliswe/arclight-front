import React, {useContext, useEffect} from 'react';
import {Text, Button} from 'native-base'
import {UserContext} from "../context/userContext";
import {withNavigation} from 'react-navigation'
import {NavigationInjectedProps} from "react-navigation";

const LogoutButton:React.FC<NavigationInjectedProps> = (props:NavigationInjectedProps) => {

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
        <Button onPress={handleLogout} bordered danger style={{justifyContent:'center'}}>
            <Text style={{color:'red'}}>
                Logout
            </Text>
        </Button>
    );
};

export default withNavigation(LogoutButton);
