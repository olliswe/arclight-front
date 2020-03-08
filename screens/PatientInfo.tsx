import React, {useState} from 'react';
import {Text, Content} from 'native-base'
import withHeader from "../higher_order_components/AuthHeaderFooterWrapper";
import PatientCard from "../components/PatientCard";
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import {PatientQueryObject, PatientData} from "../types";


const QUERY_PATIENTS = gql`
    query{
      myPatients{
        fullName,
        gender,
        id,
        dob,
        telephoneNumber,
        age
        }
    }
`;



const PatientInfo:React.FC = () => {

    const [patients, setPatients] = useState<PatientData[] | null>(null)

    const { data, loading } = useQuery<PatientQueryObject>(
        QUERY_PATIENTS, {
            onCompleted: data => {
                setPatients(data.myPatients);
            },
        }
    );

    return (
        <Content padder>
            {patients === null ?
            <Text>
                Loading...
            </Text>
            :
                ( patients.map((patient)=>(
                        <PatientCard patient={patient}/>
                    ))
                )
            }
        </Content>
    );
};

export default withHeader(PatientInfo);
