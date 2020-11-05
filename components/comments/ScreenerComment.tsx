import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, CardItem, Content, Text } from "@codler/native-base";
import Divider from "../Divider";
import { ScreenerCommentData } from "../../types";

interface Props {
  comment: ScreenerCommentData;
}

const ScreenerComment: React.FC<{ comment: ScreenerCommentData }> = ({
  comment,
}) => {
  return (
    <View style={{ flexDirection: "row", display: "flex", flex: 1 }}>
      <View style={styles.spacer} />
      <Card style={[styles.card, styles.corner]}>
        <CardItem style={[styles.corner]}>
          <Content>
            <Text style={styles.headerText}>
              {comment.screener.email} (Screener)
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
    </View>
  );
};

export default ScreenerComment;

const styles = StyleSheet.create({
  spacer: {
    flex: 0.2,
  },
  container: {
    flexDirection: "column",
    display: "flex",
    flex: 1,
  },
  corner: {
    borderRadius: 10,
    backgroundColor: "#cfffcf",
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
