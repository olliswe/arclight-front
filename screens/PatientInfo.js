import React from 'react';
import {View} from 'react-native'
import {Text} from 'native-base'
import withHeader from "../higher_order_components/AuthHeaderFooterWrapper";

const PatientInfo = (props) => {
    return (
        <View>
            <Text>
                Patient Info Page
            </Text>
        </View>
    );
};

export default withHeader(PatientInfo);
