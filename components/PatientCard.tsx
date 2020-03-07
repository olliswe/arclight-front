import React from 'react';
import {Card, Left, Body, Right, Text, CardItem, Grid, Col} from 'native-base'
import {Ionicons} from '@expo/vector-icons'


const PatientCard:React.FC = () => {
    return (
        <Card>
            <CardItem>
                <Left style={{flex:1}}>
                    <Ionicons name={'ios-person'} size={45}/>
                </Left>
                <Body style={{flex:3}}>
                    <Grid>
                        <Col size={8}>
                            <Text>
                                Vishwanath Iyer
                            </Text>
                            <Text>
                                UID: 0400242
                            </Text>
                        </Col>
                        <Col size={4}>
                            <Text>
                                Male
                            </Text>
                            <Text>
                                63 yrs
                            </Text>
                        </Col>
                    </Grid>
                </Body>
            </CardItem>
        </Card>
    );
};

export default PatientCard;
