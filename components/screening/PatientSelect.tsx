import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import {Item, Input} from "native-base";
import { useLazyQuery  } from 'react-apollo';
import { gql } from 'apollo-boost';
import {PatientData, PatientQueryObject} from "../../types";
import PatientSelectCard from "./PatientSelectCard";

const QUERY_PATIENTS = gql`
    query my_patients($searchString:String){
          my_patients(full_name__icontains:$searchString){
                full_name,
                dob,
                gender,
                id,
                telephone_number
  }
}
`;


interface Props {
    setSelectPatient:React.Dispatch<React.SetStateAction<boolean>>,
    setPatient:React.Dispatch<React.SetStateAction<PatientData|null>>
}

const PatientSelect:React.FC<Props> = (props) => {

    const [nameQuery, setNameQuery] = useState<string|null>(null);
    const [getPatients, {loading, data}] = useLazyQuery<PatientQueryObject>(
        QUERY_PATIENTS, {
            variables:{searchString:nameQuery},
            },
    )

    useEffect(()=>{

        !!nameQuery && getPatients()

    },[nameQuery])



    return (
        <View>
            <Item>
                <Input
                placeholder='Search by Patient Name'
                onChangeText={(text)=>setNameQuery(text)}
                />
            </Item>
            {
                loading ?
                    <Text>Loading...</Text>
                    :
                    <ScrollView style={styles.scrollView}>
                        {
                    data && data.my_patients.map((patient)=>(
                        <PatientSelectCard
                            patient={patient}
                            setSelectPatient={props.setSelectPatient}
                            setPatient = {props.setPatient}
                        />
                    ))}
                    </ScrollView>

            }
        </View>
    );
};

export default PatientSelect;

const styles = StyleSheet.create({
    scrollView:{
        marginTop:20,
        marginBottom:120
    }
})