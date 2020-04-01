import React from "react";
import {
  Card,
  Left,
  Body,
  Right,
  Text,
  CardItem,
  Grid,
  Col,
} from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { StackNavigationProp } from "../types";

interface Props {
  id: number;
  patientName: string;
  physicianName: string;
  lastCommentDate: string;
  recorededDate: string;
  navigation: StackNavigationProp;
}

const CaseCard: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("ViewCase", { id: props.id });
      }}
    >
      <Card>
        <CardItem style={styles.greenBackground}>
          <Body style={{ flex: 1 }}>
            <Grid style={styles.margin}>
              <Col size={6}>
                <Text>Case ID:</Text>
              </Col>
              <Col size={6}>
                <Text style={[styles.italic]}>{props.id}</Text>
              </Col>
            </Grid>
            <Grid style={styles.margin}>
              <Col size={6}>
                <Text>Patient Name:</Text>
              </Col>
              <Col size={6}>
                <Text style={[styles.italic]}>{props.patientName}</Text>
              </Col>
            </Grid>
            <Grid style={styles.margin}>
              <Col size={6}>
                <Text>Latest comment from:</Text>
              </Col>
              <Col size={6}>
                <Text style={[styles.italic]}>
                  {props.physicianName}, 5 days ago
                </Text>
              </Col>
            </Grid>
            <Grid style={styles.margin}>
              <Col size={6}>
                <Text>Recorded on:</Text>
              </Col>
              <Col size={6}>
                <Text style={[styles.italic]}>{props.recorededDate}</Text>
              </Col>
            </Grid>
          </Body>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default withNavigation(CaseCard);

const styles = StyleSheet.create({
  margin: {
    marginBottom: 5,
  },
  italic: {
    fontStyle: "italic",
  },
  greenBackground: {
    backgroundColor: "#dcfade",
  },
});
