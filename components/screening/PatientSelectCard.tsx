import React from 'react';
import {Card, Left, Body, Right, Text, CardItem, Grid, Col, Button} from 'native-base'
import {Ionicons} from '@expo/vector-icons'
import {PatientData} from "../../types";

interface Props {
    patient:PatientData
}

const PatientSelectCard:React.FC<Props> = (props) => {
    return (
        <Card>
            <CardItem>
                <Body style={{flex:3, marginTop:5}}>
                    <Grid>
                        <Col size={7}>
                            <Text>
                                {props.patient.fullName}
                            </Text>
                            <Text>
                                ID: {props.patient.id}
                            </Text>
                        </Col>
                        <Col size={5}>
                            <Text>
                                {props.patient.gender}
                            </Text>
                            <Text>
                               {props.patient.dob}
                            </Text>
                        </Col>
                    </Grid>
                </Body>
                <Right style={{flex:1}}>
                    <Button>
                        <Text>
                            Select
                        </Text>
                    </Button>
                </Right>
            </CardItem>
        </Card>
    );
};

export default PatientSelectCard;
