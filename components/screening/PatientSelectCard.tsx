import React from 'react';
import {Card, Left, Body, Right, Text, CardItem, Grid, Col, Button} from 'native-base'
import {Ionicons} from '@expo/vector-icons'
import {PatientData} from "../../types";
import {StyleSheet} from "react-native";

interface Props {
    patient:PatientData,
    setSelectPatient:React.Dispatch<React.SetStateAction<boolean>>,
    setPatient:React.Dispatch<React.SetStateAction<PatientData|null>>,
}

const PatientSelectCard:React.FC<Props> = (props) => {
    return (
        <Card>
            <CardItem>
                <Body style={styles.body}>
                    <Grid>
                        <Col size={7}>
                            <Text>
                                {props.patient.full_name}
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
                <Right style={styles.right}>
                    <Button
                    style={styles.button}
                    onPress={()=>{
                        props.setPatient(props.patient)
                        props.setSelectPatient(false)
                    }}
                    >
                        <Ionicons name={"md-checkmark"} size={30} color='white'/>
                    </Button>
                </Right>
            </CardItem>
        </Card>
    );
};

export default PatientSelectCard;

const styles = StyleSheet.create({
    button:{width:40, justifyContent:'center'},
    body:{flex:3, marginTop:5},
    right:{flex:1}
})