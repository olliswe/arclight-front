import React,{useEffect} from 'react';
import {Text, Content} from 'native-base'
import withHeader from "../higher_order_components/AuthHeaderFooterWrapper";
import PatientCard from "../components/PatientCard";
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import {PatientQueryObject, StackNavigationProp} from "../types";
import {NavigationFocusInjectedProps} from "react-navigation";


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


interface Props extends NavigationFocusInjectedProps {}

const PatientInfo:React.FC<Props> = (props) => {

    useEffect(()=> {
        props.isFocused && refetch()
        }
        ,[props.isFocused])


    const { data, loading, refetch } = useQuery<PatientQueryObject>(QUERY_PATIENTS,
        {fetchPolicy:'network-only'});

    return (
        <Content padder>
            {loading ?
            <Text>
                Loading...
            </Text>
            :
                ( data?.myPatients.map((patient)=>(
                        <PatientCard patient={patient}/>
                    ))
                )
            }
        </Content>
    );
};

export default withHeader(PatientInfo);
