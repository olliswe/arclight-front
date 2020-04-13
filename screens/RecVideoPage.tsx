import React from "react";
import { Button, Grid, Row, Text } from "native-base";
import { ScreeningStackParamList } from "../navigation/AppNavigation";
import { StackNavigationProp } from "@react-navigation/stack";

type RecVideoPageScreenNavigationProp = StackNavigationProp<
  ScreeningStackParamList,
  "HomeScreen"
>;

const RecVideoPage: React.FC<{
  navigation: RecVideoPageScreenNavigationProp;
}> = ({ navigation }) => {
  return (
    <Grid>
      <Row style={{ marginTop: 150, justifyContent: "center" }}>
        <Button onPress={() => navigation.navigate("RecVideo")}>
          <Text style={{ color: "white" }}> Start Screening </Text>
        </Button>
      </Row>
    </Grid>
  );
};

export default RecVideoPage;
