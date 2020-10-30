import React from "react";
import { Body, Card, CardItem, Col, Grid, Text } from "@codler/native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DiagnosisNavigationProp } from "../screens/Diagnosis";

interface Props {
  id: number;
  patientName: string;
  physicianName: string | boolean;
  lastCommentDate: string | boolean;
  recorededDate: string;
  loading: boolean;
  status: "REVIEWED" | "PENDING_REVIEW" | "ARCHIVED";
}

const getStyle = (status: "REVIEWED" | "PENDING_REVIEW" | "ARCHIVED") => {
  if (status === "REVIEWED") return styles.greenBackground;
  else if (status === "PENDING_REVIEW") return styles.orangeBackground;
  else if (status === "ARCHIVED") return styles.grayBackground;
};

const CaseCard: React.FC<Props> = (props) => {
  const navigation = useNavigation<DiagnosisNavigationProp>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ViewCase", { id: props.id });
      }}
      disabled={props.loading}
    >
      <Card>
        <CardItem
          style={
            props.loading ? styles.disabledBackground : getStyle(props.status)
          }
        >
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
                <Text>Recorded on:</Text>
              </Col>
              <Col size={6}>
                <Text style={[styles.italic]}>{props.recorededDate}</Text>
              </Col>
            </Grid>
            {props.physicianName && props.lastCommentDate ? (
              <Grid style={styles.margin}>
                <Col size={6}>
                  <Text>Latest comment from:</Text>
                </Col>
                <Col size={6}>
                  <Text style={[styles.italic]}>{props.physicianName}</Text>
                </Col>
              </Grid>
            ) : (
              <Grid style={styles.margin}>
                <Col size={12}>
                  <Text>No comments from physician yet</Text>
                </Col>
              </Grid>
            )}
          </Body>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default CaseCard;

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
  disabledBackground: {
    backgroundColor: "#e6e6e6",
  },
  orangeBackground: {
    backgroundColor: "#ffd480",
  },
  grayBackground: {
    backgroundColor: "lightgray",
  },
});
