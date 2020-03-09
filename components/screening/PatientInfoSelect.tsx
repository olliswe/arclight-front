import React from 'react';
import {View, StyleSheet, Text} from "react-native";
import {Container, Button} from "native-base";
import {PatientData} from "../../types";

interface Props {
    setSelectPatient:React.Dispatch<React.SetStateAction<boolean>>,
}

const PatientInfoSelect:React.FC<Props> = (props) => {
    return (
        <Container style={styles.container}>
            <View style={styles.view}>
                <Text>
                    Before starting the screening, you need to select an existing patient or add a new one
                </Text>
                <Button style={styles.button} onPress={()=>props.setSelectPatient(true)}>
                    <Text style={styles.text}>
                        Select Patient
                    </Text>
                </Button>
            </View>
        </Container>
    );
};

export default PatientInfoSelect;


const styles = StyleSheet.create({
    container:{
        padding:20
    },
    view:{
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    button:{
        marginTop:50,
        padding:10,
    },
    text:{
        color:'white',
        fontSize:16
    }
})