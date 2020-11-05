import React from "react";
import {
  Body,
  Button,
  Card,
  CardItem,
  Col,
  Grid,
  Right,
  Text,
} from "@codler/native-base";
import { Ionicons } from "@expo/vector-icons";
import { PatientData } from "../../types";
import { StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  patient: PatientData;
  setSelectPatient: React.Dispatch<React.SetStateAction<boolean>>;
  setPatient: React.Dispatch<React.SetStateAction<PatientData | null>>;
}

const PatientSelectCard: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.setPatient(props.patient);
        props.setSelectPatient(false);
      }}
    >
      <Card>
        <CardItem>
          <Body style={styles.body}>
            <Grid>
              <Col size={7}>
                <Text>{props.patient.full_name}</Text>
                <Text>ID: {props.patient.id}</Text>
              </Col>
              <Col size={5}>
                <Text>{props.patient.gender}</Text>
                <Text>{props.patient.dob}</Text>
              </Col>
            </Grid>
          </Body>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default PatientSelectCard;

const styles = StyleSheet.create({
  button: { width: 40, justifyContent: "center" },
  body: { flex: 3, marginTop: 5 },
  right: { flex: 1 },
});
