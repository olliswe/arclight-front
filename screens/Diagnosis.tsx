import React from "react";
import { Tab, Tabs, Container } from "native-base";
import ReviewedTab from "../components/diagnosis/ReviewedTab";
import PendingTab from "../components/diagnosis/PendingTab";
import ArchivedTab from "../components/diagnosis/ArchivedTab";
import { NavigationFocusInjectedProps } from "react-navigation";
import { withNavigationFocus } from "react-navigation";
import { StyleSheet } from "react-native";

interface Props extends NavigationFocusInjectedProps {}

const Diagnosis: React.FC<Props> = (props) => {
  return (
    <Container>
      <Tabs tabContainerStyle={styles.tabs}>
        <Tab heading={"Reviewed"}>
          <ReviewedTab {...props} />
        </Tab>
        <Tab heading={"Pending  "}>
          <PendingTab {...props} />
        </Tab>
        <Tab heading={"Archived"}>
          <ArchivedTab {...props} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default withNavigationFocus(Diagnosis);

const styles = StyleSheet.create({
  tabs: { height: 60, paddingTop: 15 },
});
