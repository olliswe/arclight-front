import React from "react";
import { Container, Tab, Tabs } from "native-base";
import ReviewedTab from "../components/diagnosis/ReviewedTab";
import PendingTab from "../components/diagnosis/PendingTab";
import ArchivedTab from "../components/diagnosis/ArchivedTab";
import { StyleSheet } from "react-native";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthNavigationParams } from "../navigation/AuthNavigation";
import { RootStackParams } from "../App";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { AppParamList, BottomTabParamList } from "../navigation/AppNavigation";

export type DiagnosisNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<BottomTabParamList, "Diagnosis">,
  StackNavigationProp<AppParamList>
>;

const Diagnosis: React.FC<{ navigation: DiagnosisNavigationProp }> = ({
  navigation,
}) => {
  return (
    <Container>
      <Tabs tabContainerStyle={styles.tabs}>
        <Tab heading={"Reviewed"}>
          <ReviewedTab />
        </Tab>
        <Tab heading={"Pending  "}>
          <PendingTab />
        </Tab>
        <Tab heading={"Archived"}>
          <ArchivedTab />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Diagnosis;

const styles = StyleSheet.create({
  tabs: { height: 60, paddingTop: 15 },
});
