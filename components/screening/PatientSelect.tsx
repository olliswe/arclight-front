import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native'
import {Item, Input} from "native-base";
import { useLazyQuery  } from 'react-apollo';
import { gql } from 'apollo-boost';
import {PatientData, PatientQueryObject} from "../../types";
import PatientSelectCard from "./PatientSelectCard";

const QUERY_PATIENTS = gql`
    query myPatients($searchString:String){
          myPatients(fullName_Icontains:$searchString){
                fullName,
                dob,
                gender,
                id
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

                    data && data.myPatients.map((patient)=>(
                        <PatientSelectCard patient={patient}/>
                    ))

            }
        </View>
    );
};

export default PatientSelect;
