import React from 'react';
import {Image, StyleSheet, View,} from 'react-native'
import {H3, Card, Content, Text, Body, CardItem} from 'native-base'
import withHeader from "../higher_order_components/AuthHeaderFooterWrapper";

const Home = (props) => {
    return (
        <Content padder>
            <Card style={styles.card}>
                    <Body>
                        <Image
                            source={require('../assets/hospital.png')}
                            style={styles.image}
                        />
                        <H3 style={styles.header}>
                            Test Health Facility
                        </H3>
                    </Body>
                <CardItem bordered>
                    <Body>

                    </Body>
                </CardItem>
            </Card>
        </Content>
    );
};


const styles = StyleSheet.create({
    card:{
        padding:10
    },
    image:{
        height:60,
        resizeMode:'contain',
    },
    header:{
        textAlign:'center',
        marginTop:10
    }
})


export default withHeader(Home);
