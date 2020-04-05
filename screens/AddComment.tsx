import React, { useState } from "react";
import {
  Body,
  Button,
  Container,
  Header,
  Icon,
  Left,
  Right,
  Subtitle,
  Text,
  Textarea,
  Title,
} from "native-base";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { UserContext, UserContextProps } from "../context/userContext";
import axios from "axios";
import { API_URL } from "../constants";
import PageLoading from "../components/loadingSpinners/PageLoading";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../navigation/AppNavigation";
import { RouteProp } from "@react-navigation/native";

export type AddCommentScreenNavigationProp = StackNavigationProp<
  AppParamList,
  "AddComment"
>;

type AddCommentRouteProp = RouteProp<AppParamList, "AddComment">;

const AddComment: React.FC<{
  navigation: AddCommentScreenNavigationProp;
  route: AddCommentRouteProp;
}> = ({ navigation, route }) => {
  const { id } = route.params;
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  let userContext: UserContextProps = React.useContext(UserContext);

  const handleSubmit = () => {
    setLoading(true);
    let headers = { Authorization: "Token " + userContext.state.token };
    let body = {
      comment: comment,
      videoupload: id,
      screener: userContext.state.user?.id,
    };
    axios
      .post(API_URL + "api/screener_comments/", body, { headers: headers })
      .then((res) => {
        navigation.navigate("ViewCase", { id: id });
      })
      .catch((error) => setLoading(false));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container style={{ flex: 1 }}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => navigation.navigate("ViewCase", { id: id })}
              disabled={loading}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Case ID: {id}</Title>
            <Subtitle>Add comment</Subtitle>
          </Body>
          <Right />
        </Header>
        {loading ? (
          <PageLoading />
        ) : (
          <Container style={styles.container}>
            <Container style={{ flex: 1 }}>
              <Textarea
                rowSpan={8}
                bordered
                placeholder="Add a message for physician"
                underline={false}
                onChangeText={(text) => setComment(text)}
                value={comment}
              />
              <Button block style={styles.submitButton} onPress={handleSubmit}>
                <Text>Submit</Text>
              </Button>
            </Container>
            <Button
              bordered
              warning
              block
              onPress={() => navigation.navigate("ViewCase", { id: id })}
            >
              <Text>Cancel</Text>
            </Button>
          </Container>
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default AddComment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    paddingTop: 40,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  submitButton: {
    marginBottom: 20,
    marginTop: 15,
  },
});
