import React from "react";
import { View } from "react-native";
import { Text } from "@codler/native-base";
import withHeader from "../higher_order_components/AuthHeaderFooterWrapper";
import { DrawerParamList } from "../navigation/AppNavigation";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type AboutScreenNavigationProp = DrawerNavigationProp<DrawerParamList, "About">;

const About: React.FC<{ navigation: AboutScreenNavigationProp }> = ({
  navigation,
}) => {
  return (
    <View>
      <Text>About Page</Text>
    </View>
  );
};

export default withHeader(About);
