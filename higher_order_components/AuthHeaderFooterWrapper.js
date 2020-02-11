import React, {useRef, useEffect} from 'react';
import {Container, Drawer, Text} from "native-base";
import {View} from 'react-native'
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import DrawerContent from "../components/DrawerContent";
import {withNavigation} from "react-navigation";

const withHeader =  (WrappedComponent) => {

    return (
        withNavigation(function (props) {


            const openDrawer = () => {
                props.navigation.openDrawer()
            };




                return(
                <Container>
                    <AppHeader openDrawer={openDrawer}/>
                    <WrappedComponent {...props}    />
                </Container>
            )
        }
    )
)
};

export default withHeader;
