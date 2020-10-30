import React from "react";
import {
  Body,
  Card,
  CardItem,
  Col,
  Grid,
  Left,
  Text,
} from "@codler/native-base";
import { Ionicons } from "@expo/vector-icons";
import { PatientData } from "../types";

interface Props {
  patient: PatientData;
}

const PatientCard: React.FC<Props> = (props) => {
  return (
    <Card>
      <CardItem>
        <Left style={{ flex: 1 }}>
          <Ionicons name={"ios-person"} size={45} />
        </Left>
        <Body style={{ flex: 3 }}>
          <Grid>
            <Col size={8}>
              <Text>{props.patient.full_name}</Text>
              <Text>ID: {props.patient.id}</Text>
            </Col>
            <Col size={4}>
              <Text>{props.patient.gender}</Text>
              <Text>{props.patient.age} years</Text>
            </Col>
          </Grid>
        </Body>
      </CardItem>
    </Card>
  );
};

export default PatientCard;
