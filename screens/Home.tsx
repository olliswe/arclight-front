import React, { useContext } from "react";
import { Image, StyleSheet } from "react-native";
import { Body, Card, CardItem, Content, H3 } from "@codler/native-base";
import { UserContext } from "../context/userContext";
import withHeader from "../higher_order_components/AuthHeaderFooterWrapper";

const Home: React.FC = () => {
  let userContext = useContext(UserContext);
  let user = userContext.state.user;

  return (
    <Content padder>
      <Card style={styles.card}>
        <Body>
          <Image
            source={require("../assets/hospital.png")}
            style={styles.image}
          />
          <H3 style={styles.header}>{user && user.facility.facility_name}</H3>
        </Body>
        <CardItem bordered>
          <Body></Body>
        </CardItem>
      </Card>
    </Content>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
  image: {
    height: 60,
    resizeMode: "contain",
  },
  header: {
    textAlign: "center",
    marginTop: 10,
  },
});

export default withHeader(Home);
