import React, { useEffect } from "react";
import { Text, Content } from "native-base";
import withHeader from "../higher_order_components/AuthHeaderFooterWrapper";
import PatientCard from "../components/PatientCard";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import { PatientQueryObject, StackNavigationProp } from "../types";
import { NavigationFocusInjectedProps } from "react-navigation";
import { withNavigationFocus } from "react-navigation";
import PageLoading from "../components/loadingSpinners/PageLoading";

const QUERY_PATIENTS = gql`
  query {
    my_patients {
      full_name
      gender
      id
      dob
      telephone_number
      age
    }
  }
`;

interface Props extends NavigationFocusInjectedProps {}

const PatientInfo: React.FC<Props> = (props) => {
  useEffect(() => {
    props.isFocused && refetch();
  }, [props.isFocused]);

  const { data, loading, refetch } = useQuery<PatientQueryObject>(
    QUERY_PATIENTS,
    { fetchPolicy: "network-only" }
  );

  return loading ? (
    <PageLoading />
  ) : (
    <Content padder>
      {data?.my_patients.map((patient) => (
        <PatientCard patient={patient} />
      ))}
    </Content>
  );
};

export default withNavigationFocus(PatientInfo);
