import React, { Fragment, useState } from "react";
import { Container, Spinner } from "@codler/native-base";
import { StyleSheet, Switch, Text, View } from "react-native";
import NewPatientForm from "./NewPatientForm";
import PatientSelect from "./PatientSelect";
import { PatientData } from "../../types";

interface Props {
  setSelectPatient: React.Dispatch<React.SetStateAction<boolean>>;
  setPatient: React.Dispatch<React.SetStateAction<PatientData | null>>;
}

const PatientSelectForm: React.FC<Props> = (props) => {
  const [newPatient, setNewPatient] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Container style={styles.container}>
      {loading ? (
        <View style={styles.spinner}>
          <Spinner />
        </View>
      ) : (
        <Fragment>
          <View style={styles.centerRow}>
            <Switch
              value={newPatient}
              onValueChange={(value) => setNewPatient(value)}
            />
            <Text>&nbsp; &nbsp; New Patient</Text>
          </View>
          {newPatient ? (
            <NewPatientForm
              setSelectPatient={props.setSelectPatient}
              setPatient={props.setPatient}
              setLoading={setLoading}
            />
          ) : (
            <PatientSelect
              setSelectPatient={props.setSelectPatient}
              setPatient={props.setPatient}
            />
          )}
        </Fragment>
      )}
    </Container>
  );
};

export default PatientSelectForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
  },
  centerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
