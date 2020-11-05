import React, { useCallback, useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { Container, Text } from "@codler/native-base";
import { Ionicons } from "@expo/vector-icons";
import { VideoFile } from "../../screens/RecVideoFlow";

const offSet: number = 150;

type Props = {
  setShowCamera: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  setRecordedVideo: (
    value: VideoFile | ((prevVar: VideoFile) => VideoFile)
  ) => void;
};

const MyCam: React.FC<Props> = (props) => {
  const [recording, setRecording] = useState<boolean | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [focus, setFocus] = useState<number>(0.5);
  const [zoom, setZoom] = useState<number>(0);
  const [cameraNotReady, setCameraNotReady] = useState<boolean>(false);

  let cam = React.useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(
        Permissions.AUDIO_RECORDING,
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL
      );
      setHasPermission(true);
    })();
  }, []);

  const getOptions = () =>
    Platform.OS === "android"
      ? { quality: Camera.Constants.VideoQuality["4:3"] }
      : {};

  const recordVideo = useCallback(async () => {
    if (!!cam.current) {
      return await cam.current.recordAsync({ ...getOptions() });
    } else {
      alert("The Camera is still loading, please wait!");
    }
  }, []);

  const saveVideo = useCallback(
    async (video: { uri: string } | undefined) => {
      if (!!video) {
        console.log("hi");
        const asset = await MediaLibrary.createAssetAsync(video.uri);
        console.log(asset);
        console.log("get");
        console.log(await MediaLibrary.getAssetsAsync());
        const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);
        console.log("domne");
        if (asset) {
          props.setRecordedVideo({
            uri: assetInfo.localUri,
            filename: asset.filename,
          });
          console.log("video saved!");
        }
        return "Video Saved";
      } else {
        alert(
          "An error occurred when attempting to access the recorded video!"
        );
      }
    },
    [props.setRecordedVideo]
  );

  const recordAndSaveVideo = useCallback(async () => {
    try {
      const res = await recordVideo();
      await saveVideo(res);
      props.setShowCamera(false);
    } catch (error) {
      console.log(error);
    }
  }, [recordVideo, saveVideo, props.setShowCamera]);

  useEffect(() => {
    console.log(recording);
    if (!!cam.current) {
      console.log("foo");
      if (recording) {
        recordAndSaveVideo();
      } else if (recording === false) {
        cam.current.stopRecording();
      }
    }
  }, [recording, recordAndSaveVideo]);

  const stopRecord = () => {
    setRecording(false);
  };

  const startRecord = () => {
    if (cam) {
      setRecording(true);
    }
  };

  const toggleRecord = () => {
    if (recording) {
      stopRecord();
    } else {
      startRecord();
    }
  };

  const increaseFocus = () => {
    if (Platform.OS === "android") {
      setCameraNotReady(true);
    }
    if (focus < 1) {
      setFocus((focus) => focus + 0.05);
    }
  };

  const decreaseFocus = () => {
    if (Platform.OS === "android") {
      setCameraNotReady(true);
    }
    if (focus > 0) {
      setFocus((focus) => focus - 0.05);
    }
  };

  const increaseZoom = () => {
    if (Platform.OS === "android") {
      setCameraNotReady(true);
    }
    if (zoom < 1) {
      setZoom((zoom) => zoom + 0.05);
    }
  };

  const decreaseZoom = () => {
    if (Platform.OS === "android") {
      setCameraNotReady(true);
    }
    if (zoom > 0) {
      setZoom((zoom) => zoom - 0.05);
    }
  };

  if (hasPermission === null) {
    return <Container />;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Camera
      style={{
        flex: 1,
        width: "100%",
      }}
      ref={cam}
      focusDepth={focus}
      zoom={zoom}
      useCamera2Api={true}
      autoFocus={Camera.Constants.AutoFocus.off}
      onCameraReady={() => setCameraNotReady(false)}
    >
      <Text
        style={{
          ...styles.zoomItem,
          top: offSet,
        }}
      >
        Zoom
      </Text>
      <TouchableOpacity
        onPress={increaseZoom}
        style={{
          ...styles.zoomItem,
          top: offSet + 40,
        }}
        disabled={cameraNotReady || zoom > 0.95}
      >
        <Ionicons name={"md-add"} size={40} color={"white"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={decreaseZoom}
        style={{
          ...styles.zoomItem,
          top: offSet + 120,
        }}
        disabled={cameraNotReady || zoom < 0.05}
      >
        <Ionicons name={"md-remove"} size={40} color={"white"} />
      </TouchableOpacity>
      <Text
        style={{
          ...styles.zoomItem,
          top: offSet + 200,
        }}
      >
        {Math.round(zoom * 100)} %
      </Text>
      <Text
        style={{
          ...styles.focusItem,
          top: offSet,
        }}
      >
        Focus
      </Text>
      <TouchableOpacity
        onPress={increaseFocus}
        style={{
          ...styles.focusItem,
          top: offSet + 40,
        }}
        disabled={cameraNotReady || focus > 0.95}
      >
        <Ionicons name={"md-add"} size={40} color={"white"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={decreaseFocus}
        style={{
          ...styles.focusItem,
          top: offSet + 120,
        }}
        disabled={cameraNotReady || focus < 0.05}
      >
        <Ionicons name={"md-remove"} size={40} color={"white"} />
      </TouchableOpacity>
      <Text
        style={{
          ...styles.focusItem,
          top: offSet + 200,
        }}
      >
        {Math.round(focus * 100)} %
      </Text>
      <TouchableOpacity
        onPress={toggleRecord}
        style={{
          padding: 20,
          width: "100%",
          backgroundColor: recording ? "#ef4f84" : "#4fef97",
          position: "absolute",
          bottom: 10,
        }}
      >
        <Text style={{ textAlign: "center" }}>
          {recording ? "Stop" : "Record"}
        </Text>
      </TouchableOpacity>
    </Camera>
  );
};

export default MyCam;

const styles = StyleSheet.create({
  focusItem: {
    position: "absolute",
    right: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    padding: 3,
  },
  zoomItem: {
    position: "absolute",
    left: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    padding: 3,
  },
});
