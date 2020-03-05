import React, {useRef} from 'react';
import {Header, Left, Button, Icon, Body, Title, Right, View} from "native-base";
import {StyleSheet} from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';

const AppHeader = (props) => {

    return (
            <Header>
                <Left>
                    <Button transparent onPress={props.openDrawer}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>Version 0.21</Title>
                </Body>
                <Right>
                </Right>
            </Header>
    );
};



export default AppHeader;
