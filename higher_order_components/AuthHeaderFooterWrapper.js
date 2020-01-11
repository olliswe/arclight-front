import React, {useRef, useEffect} from 'react';
import {Container, Drawer, Text} from "native-base";
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import DrawerContent from "../components/DrawerContent";

const withHeaderFooter =  (WrappedComponent) => {

    return (
        function (props) {
            const drawer = useRef()

            const closeDrawer = () => {
                drawer.current._root.close()
            };

            const openDrawer = () => {
                drawer.current._root.open()
            };




            return(
                <Drawer
                    ref={drawer}
                    content={<DrawerContent/>}
                    onClose={() => closeDrawer()}
                >
                    <AppHeader openDrawer={openDrawer}/>
                    <WrappedComponent {...props}/>
                    <AppFooter/>
                </Drawer>
            )
        }
    );
};

export default withHeaderFooter;
