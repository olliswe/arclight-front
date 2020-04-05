import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "native-base";
import { PatientData } from "../../types";

interface Props {
  patient: PatientData;
  setSelectPatient: React.Dispatch<React.SetStateAction<boolean>>;
  setPatient: React.Dispatch<React.SetStateAction<PatientData | null>>;
}

const PatientRecord: React.FC<Props> = (props) => {
  return (
    <View>
      <View style={styles.topMargin}>
        <Text>
          <Text style={styles.bold}>Name:&nbsp;</Text>
          {props.patient.full_name}
        </Text>
      </View>
      <View style={styles.topMargin}>
        <Text>
          <Text style={styles.bold}>D.O.B:&nbsp;</Text>
          {props.patient.dob}
        </Text>
      </View>
      <View style={styles.topMargin}>
        <Text>
          <Text style={styles.bold}>Gender:&nbsp;</Text>
          {props.patient.gender}
        </Text>
      </View>
      <View style={styles.topMargin}>
        <Text>
          <Text style={styles.bold}>Telephone No:&nbsp;</Text>
          {props.patient.telephone_number}
        </Text>
      </View>
      <View style={styles.topMargin}>
        <Button
          onPress={() => {
            props.setPatient(null);
            props.setSelectPatient(true);
          }}
        >
          <Text>Select another Patient</Text>
        </Button>
      </View>
    </View>
  );
};

export default PatientRecord;

const styles = StyleSheet.create({
  topMargin: {
    marginTop: 20,
  },
  bold: {
    fontWeight: "bold",
  },
});
