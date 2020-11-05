import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, CardItem, Content, Text } from "@codler/native-base";
import Divider from "../Divider";
import { DoctorCommentData } from "../../types";

interface Props {
  comment: DoctorCommentData;
}

const DoctorComment: React.FC<Props> = ({ comment }) => {
  return (
    <View style={styles.container}>
      <Card style={[styles.card, styles.corner]}>
        <CardItem style={[styles.corner]}>
          <Content>
            <Text style={styles.headerText}>
              {comment.physician.email} (Physician)
            </Text>
            <Divider style={styles.divider} />
            <Text style={styles.divider}>{comment.comment}</Text>
            <Divider style={styles.divider} />
            <View style={styles.daterow}>
              <Text style={styles.dateText}>
                {comment.date_added.slice(0, 10)}
              </Text>
            </View>
          </Content>
        </CardItem>
      </Card>
      <View style={styles.spacer} />
    </View>
  );
};

export default DoctorComment;

const styles = StyleSheet.create({
  spacer: {
    flex: 0.2,
  },
  container: {
    flexDirection: "row",
    display: "flex",
    flex: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  corner: {
    borderRadius: 10,
  },
  card: {
    flex: 0.8,
  },
  divider: {
    marginBottom: 10,
  },
  daterow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  headerText: {
    fontWeight: "bold",
    color: "blue",
    fontSize: 14,
  },
  dateText: {
    fontStyle: "italic",
    fontSize: 14,
    color: "darkgray",
  },
});
