import React from 'react'
import SafeAreaView from 'react-native-safe-area-view';
import { DrawerItems, DrawerContentComponentProps } from 'react-navigation-drawer';
import LogoutButton from "./LogoutButton";
import {StyleSheet, ScrollView, View, Image} from "react-native";


const DrawerContent:React.FC<DrawerContentComponentProps> = (props:DrawerContentComponentProps) => (
    <ScrollView>
        <SafeAreaView
            style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}
        >
            <View>
                <Image
                    source={require('../assets/arclight_logo.png')}
                    style={styles.image}
                />
            </View>
            <DrawerItems {...props} />
            <View style={styles.logoutbutton}>
                <LogoutButton/>
            </View>
        </SafeAreaView>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoutbutton:{
        width:'50%',
        marginLeft:10,
        marginTop:'90%'

},
    image:{
        width:'80%',
        height:50,
        resizeMode:'contain',
        marginTop:20,
    },
});

export default DrawerContent
