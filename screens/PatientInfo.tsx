import React, {useEffect} from 'react';
import {Text, Content} from 'native-base'
import withHeader from "../higher_order_components/AuthHeaderFooterWrapper";
import PatientCard from "../components/PatientCard";
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import {Patient} from "../types";


const QUERY_PATIENTS = gql`
    query{
      myPatients{
        edges{
          node{
            fullName,
            uid,
            gender
          }
        }
      }
    }
`;


export type PatientData = {
    myPatients: Patient[]
}

const PatientInfo:React.FC = () => {

    const { data, loading } = useQuery<PatientData>(
        QUERY_PATIENTS, {
            onCompleted: data => {
                // Not called
                console.log(data);
            },
        }
    );

    return (
        <Content padder>
            {loading ?
            <Text>
                Loading...
            </Text>
            :
                <PatientCard/>

            }
        </Content>
    );
};

export default withHeader(PatientInfo);
