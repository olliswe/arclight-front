import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@codler/native-base";
import withHeader from "../higher_order_components/AuthHeaderFooterWrapper";
import * as ExpoPixi from "expo-pixi";

const Surveys: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Signature Approval</Text>
      </View>
      <View style={{ flex: 1 }}>
        <ExpoPixi.Sketch style={styles.sketch} />
        <Text>Canvas - draw here</Text>
      </View>
    </View>
  );
};

export default withHeader(Surveys);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sketch: {
    flex: 1,
  },
  label: {
    width: "100%",
    padding: 5,
    alignItems: "center",
  },
});
