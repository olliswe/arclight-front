import React from 'react';
import {Container } from "native-base";
import AppHeader from "../components/Header";
import {withNavigation, NavigationInjectedProps} from "react-navigation";
import {NavigationDrawerProp} from "react-navigation-drawer";


type NavProps = {
    navigation: NavigationInjectedProps & NavigationDrawerProp;
};


// (WrapperComponent:React.FC) => React.FC<NavProps>

const withHeader= (WrappedComponent: React.FC) => {

    return (
        withNavigation(function (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & NavProps) {


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
