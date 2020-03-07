import React from 'react';
import {View} from 'react-native'
import {Text} from 'native-base'
import withHeader from "../higher_order_components/AuthHeaderFooterWrapper";

const About:React.FC = () => {
    return (
        <View>
            <Text>
                About Page
            </Text>
        </View>
    );
};

export default withHeader(About);
