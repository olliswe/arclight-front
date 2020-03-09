import React, {useState} from 'react';
import {Button, Container} from "native-base";
import {StyleSheet, Text, Switch, View} from "react-native";
import NewPatientForm from "./NewPatientForm";
import PatientSelect from "./PatientSelect";
import {PatientData} from "../../types";

interface Props {
    setSelectPatient:React.Dispatch<React.SetStateAction<boolean>>,
    setPatient:React.Dispatch<React.SetStateAction<PatientData|null>>
}

const PatientSelectForm:React.FC<Props> = (props) => {

    const [newPatient, setNewPatient] = useState<boolean>(false)


    return (
        <Container style={styles.container}>
            <View style={styles.centerRow}>
                <Switch value={newPatient} onValueChange={(value)=>setNewPatient(value)}/>
                <Text>
                    &nbsp; &nbsp; New Patient
                </Text>
            </View>
            {
                newPatient ?
                    <NewPatientForm setSelectPatient={props.setSelectPatient} setPatient={props.setPatient}/>
                    :
                    <PatientSelect setSelectPatient={props.setSelectPatient} setPatient={props.setPatient} />

            }

        </Container>
    );
};

export default PatientSelectForm;


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        flexDirection:'column'
    },
    centerRow:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        margin:20
    }

})