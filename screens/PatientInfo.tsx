import React, { useCallback, useEffect } from "react";
import { Content } from "native-base";
import PatientCard from "../components/PatientCard";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import { PatientQueryObject } from "../types";
import PageLoading from "../components/loadingSpinners/PageLoading";
import { BottomTabParamList } from "../navigation/AppNavigation";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";

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

type PatientInfoScreenNavigationProp = BottomTabNavigationProp<
  BottomTabParamList,
  "Patients"
>;

const PatientInfo: React.FC<{
  navigation: PatientInfoScreenNavigationProp;
}> = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      console.log("fetch");
      refetch();
    }, [])
  );

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

export default PatientInfo;
