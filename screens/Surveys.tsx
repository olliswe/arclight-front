import React from "react";
import { View } from "react-native";
import { Text } from "native-base";
import withHeader from "../higher_order_components/AuthHeaderFooterWrapper";

const Surveys: React.FC = () => {
  return (
    <View>
      <Text>Surveys Page</Text>
    </View>
  );
};

export default withHeader(Surveys);
