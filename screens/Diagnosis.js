import React from 'react';
import {View} from 'react-native'
import {Text} from 'native-base'
import withHeader from "../higher_order_components/AuthHeaderFooterWrapper";

const Diagnosis = (props) => {
    return (
        <View>
            <Text>
                Diagnosis Page
            </Text>
        </View>
    );
};

export default withHeader(Diagnosis);
