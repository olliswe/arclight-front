import React from "react";
import { View } from "react-native";
import { Text } from "native-base";
import withHeader from "../higher_order_components/AuthHeaderFooterWrapper";

const Help: React.FC = () => {
  return (
    <View>
      <Text>Help Page</Text>
    </View>
  );
};

export default withHeader(Help);
