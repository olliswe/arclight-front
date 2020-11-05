import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Button } from "@codler/native-base";
//@ts-ignore
import * as ExpoPixi from "expo-pixi";
import * as ScreenOrientation from "expo-screen-orientation";
import PageLoading from "../loadingSpinners/PageLoading";

interface Props {
  handleSubmit: (uri: string) => void;
  setShowSignature: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signature = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    ).then((res) => setLoading(false));
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const sketch = useRef<any>();

  const processSignature = async () => {
    const { uri }: { uri: string } = await sketch.current.takeSnapshotAsync({
      format: "png",
    });
    return uri;
  };

  return loading ? (
    <PageLoading />
  ) : (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={{ fontWeight: "bold" }}>Patient Approval</Text>
      </View>
      <View style={styles.label}>
        <Text style={{ textAlign: "center" }}>
          By signing in this box you consent to the storing of your
          eye-examination video on a database to be reviewed by an
          ophthalmologist in a different location.
        </Text>
      </View>
      <View style={styles.sketchContainer}>
        <ExpoPixi.Sketch style={styles.sketch} ref={sketch} />
      </View>
      <View style={styles.submit}>
        <Button
          block
          onPress={() =>
            processSignature().then((uri) => {
              props.setShowSignature(false);
              props.handleSubmit(uri);
            })
          }
        >
          <Text>Submit</Text>
        </Button>
      </View>
    </View>
  );
};

export default Signature;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sketchContainer: {
    flex: 1,
    padding: 20,
  },
  sketch: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#ffff",
  },
  label: {
    width: "100%",
    alignItems: "center",
    paddingLeft: 50,
    paddingRight: 50,
  },
  topHeader: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  submit: {
    width: "100%",
    marginBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
});
