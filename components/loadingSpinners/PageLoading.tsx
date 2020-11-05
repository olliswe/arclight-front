import React from "react";
import { StyleSheet, View } from "react-native";
import { Spinner } from "@codler/native-base";

const PageLoading = () => {
  return (
    <View style={styles.container}>
      <Spinner />
    </View>
  );
};

export default PageLoading;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
