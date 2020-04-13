import React from "react";
import { Body, Button, Header, Icon, Left, Right, Title } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../navigation/AppNavigation";
import { VERSION_NO } from "../constants";

const AppHeader: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <Header>
      <Left>
        <Button transparent onPress={navigation.openDrawer}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>Version {VERSION_NO}</Title>
      </Body>
      <Right></Right>
    </Header>
  );
};

export default AppHeader;
