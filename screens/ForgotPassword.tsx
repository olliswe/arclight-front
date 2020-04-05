import React, { useState } from "react";
import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item,
  Spinner,
  Text,
} from "native-base";
import { Image, StyleSheet, View } from "react-native";
import axios from "axios";
import { Linking } from "expo";
import { API_URL } from "../constants";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthNavigationParams } from "../navigation/AuthNavigation";

type ForgotPasswordScreenProps = StackNavigationProp<
  AuthNavigationParams,
  "ForgotPassword"
>;

const ForgotPassword: React.FC<{ navigation: ForgotPasswordScreenProps }> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleForgot = () => {
    setLoading(true);
    setSuccess(false);
    setError(false);
    let url: string = Linking.makeUrl("auth/password_reset");
    let body = { email: email, url: url };
    axios
      .post(API_URL + "accounts/password_reset/", body)
      .then((res) => {
        setLoading(false);
        setSuccess(true);
        console.log(res);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        console.log(error);
      });
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <Container style={styles.container}>
      <Content>
        <View>
          <Image
            source={require("../assets/arclight_logo.png")}
            style={styles.image}
          />
        </View>
        <Form style={styles.form}>
          <Item style={styles.item}>
            <Input
              placeholder="Type your Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </Item>
          <Button
            style={styles.button}
            onPress={handleForgot}
            disabled={loading}
          >
            {loading ? (
              <Spinner color="white" />
            ) : (
              <Text>Send Password Reset Email</Text>
            )}
          </Button>
        </Form>
        {error && (
          <Text style={styles.message}>
            Error: We don't seem to have that email registered in our database.
          </Text>
        )}
        {success && (
          <Text style={styles.message}>
            Success! A password reset email was sent to your email.
          </Text>
        )}
        <Text
          style={styles.link}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          Return to Login screen
        </Text>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
  },
  container: {
    padding: 10,
  },
  centeredText: {
    textAlign: "center",
    marginTop: 10,
  },
  item: {
    marginBottom: 30,
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    marginTop: 100,
  },
  form: {
    marginTop: 50,
  },
  link: {
    textAlign: "center",
    marginTop: 50,
    textDecorationLine: "underline",
    padding: 20,
  },
  message: {
    textAlign: "center",
    marginTop: 25,
  },
});

export default ForgotPassword;
