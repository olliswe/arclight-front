import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, CardItem, Content, Text } from "native-base";
import Divider from "../Divider";

const ScreenerComment: React.FC = () => {
  return (
    <View style={{ flexDirection: "row", display: "flex", flex: 1 }}>
      <View style={styles.spacer} />
      <Card style={[styles.card, styles.corner]}>
        <CardItem style={[styles.corner]}>
          <Content>
            <Text style={styles.headerText}>Oliver Iyer (Screener)</Text>
            <Divider style={styles.divider} />
            <Text style={styles.divider}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
            <Divider style={styles.divider} />
            <View style={styles.daterow}>
              <Text style={styles.dateText}>2020-03-24</Text>
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
