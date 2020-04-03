import React from "react";
import { Content, Grid, Text } from "native-base";
import { StyleSheet } from "react-native";
import DoctorComment from "./DoctorComment";
import ScreenerComment from "./ScreenerComment";
import { DoctorCommentData, ScreenerCommentData } from "../../types";

interface Props {
  comments: (DoctorCommentData | ScreenerCommentData)[];
}

const Comments: React.FC<Props> = (props) => {
  return (
    <Content style={styles.container}>
      <Grid style={styles.row}>
        <Text style={styles.header}>Discussion</Text>
      </Grid>
      <Content>
        {props.comments.length > 0 &&
          props.comments.map((item) => {
            if (item.type === "doctor") return <DoctorComment comment={item} />;
            else return <ScreenerComment />;
          })}
      </Content>
    </Content>
  );
};

export default Comments;

const styles = StyleSheet.create({
  header: {
    fontSize: 17,
    fontWeight: "bold",
  },
  row: {
    justifyContent: "space-between",
    margin: 10,
  },
  container: {
    marginBottom: 40,
  },
});
