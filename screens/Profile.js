import React from 'react';
import {View} from 'react-native'
import {Text} from 'native-base'
import withHeader from "../higher_order_components/AuthHeaderFooterWrapper";

const Profile = (props) => {
    return (
        <View>
            <Text>
                Profile Page
            </Text>
        </View>
    );
};

export default withHeader(Profile);
