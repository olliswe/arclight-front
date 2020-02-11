import React from 'react';
import {Button, Grid, Row, Text} from "native-base";
import { withNavigation } from 'react-navigation';
import withHeader from "../higher_order_components/AuthHeaderFooterWrapper";
import {compose} from 'redux'

const RecVideoPage = (props) => {

    return (
        <Grid>
            <Row style={{marginTop:150, justifyContent:'center'}}>
                <Button onPress={()=>props.navigation.navigate('RecVideoFlow')}>
                    <Text style={{color:'white'}}> Start Screening </Text>
                </Button>
            </Row>
        </Grid>
    );
};

export default compose(withHeader, withNavigation)(RecVideoPage);
