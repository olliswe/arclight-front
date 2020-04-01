import React from 'react';
import {Button, Grid, Row, Text} from "native-base";
import withHeader from "../higher_order_components/AuthHeaderFooterWrapper";
import {StackNavigationProp} from "../types";

interface Props {
    navigation:StackNavigationProp,
}

const RecVideoPage:React.FC<Props> = (props:Props) => {

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

export default RecVideoPage;
