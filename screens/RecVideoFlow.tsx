import React, { useContext, useRef, useState } from "react";
import { Button, Container, Icon, Spinner, Text, Textarea } from "native-base";
import { ProgressStep, ProgressSteps } from "react-native-progress-steps";
import { Alert, StyleSheet, View } from "react-native";
import * as Permissions from "expo-permissions";
import MyCam from "../components/screening/MyCam";
import { Video } from "expo-av";
import axios from "axios";
import { UserContext, UserContextProps } from "../context/userContext";
import { API_URL } from "../constants";
import { PatientData } from "../types";
import PatientInfoSelect from "../components/screening/PatientInfoSelect";
import PatientSelectForm from "../components/screening/PatientSelectForm";
import PatientRecord from "../components/screening/PatientRecord";
import { ScreeningStackParamList } from "../navigation/AppNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import Signature from "../components/screening/Signature";

export interface VideoFile {
  uri: string | null | undefined;
  filename: string | null | undefined;
}

const progressStepsStyle = {
  activeStepIconBorderColor: "#334393",
  activeLabelColor: "#334393",
  activeStepNumColor: "white",
  activeStepIconColor: "#334393",
  completedStepIconColor: "#334393",
  completedProgressBarColor: "#334393",
  completedCheckColor: "white",
};

type RecVideoFlowScreenNavigationProp = StackNavigationProp<
  ScreeningStackParamList,
  "RecVideo"
>;

const RecVideoFlow: React.FC<{
  navigation: RecVideoFlowScreenNavigationProp;
}> = ({ navigation }) => {
  const context: UserContextProps = useContext(UserContext);
  const token = context.state.token;

  const [patient, setPatient] = useState<PatientData | null>(null);
  const [activeStep, setActiveStep] = useState<0 | 1 | 2 | 3>(0);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [recordedVideo, setRecordedVideo] = useState<VideoFile>({
    uri: null,
    filename: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectPatient, setSelectPatient] = useState<boolean>(false);
  const [showSignature, setShowSignature] = useState<boolean>(false);

  let videoRef = useRef<Video>(null);

  const firstDisabled: boolean = patient === null;

  const handleCancel = () => {
    Alert.alert(
      "You are about to abort the screening!",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "OK", onPress: () => navigation.navigate("HomeScreen") },
      ],
      { cancelable: true }
    );
  };

  const _showCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === "granted") {
      setShowCamera(true);
    }
  };

  const showRecording = () => {
    if (!!videoRef.current) {
      videoRef.current.presentFullscreenPlayer();
    }
  };

  const redoRecording = () => {
    setRecordedVideo({
      uri: null,
      filename: null,
    });
    _showCamera();
  };

  const handleSubmit = (uri: string) => {
    if (patient && recordedVideo.filename) {
      setLoading(true);
      const data = new FormData();
      // @ts-ignore
      data.append("file", {
        // @ts-ignore - Request only works if object is passed
        name: "recording",
        type: "video/mp4",
        uri: recordedVideo.uri,
      });
      data.append("patient_id", patient.id);
      data.append("comment", comment);
      data.append("signature", {
        // @ts-ignore - Request only works if object is passed
        name: "signature.jpeg",
        type: "image/jpeg",
        uri: uri,
      });
      console.log(uri);

      let headers = {
        Authorization: "Token " + token,
        "Content-Type": "multipart/form-data",
      };

      axios
        .post(API_URL + "api/upload_video/", data, { headers: headers })
        .then((res) => {
          setLoading(false);
          setSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setSuccess(false);
          setError(true);
        });
    } else {
      setError(true);
    }
  };

  return showCamera ? (
    <MyCam setShowCamera={setShowCamera} setRecordedVideo={setRecordedVideo} />
  ) : success ? (
    <Container>
      <Container>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Text>Success!</Text>
            <Button
              style={styles.topMargin}
              onPress={() => navigation.navigate("HomeScreen")}
            >
              <Text>Close</Text>
            </Button>
          </View>
        </View>
      </Container>
    </Container>
  ) : loading ? (
    <Container>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Spinner />
          <Text style={styles.topMargin}>
            Uploading the video, please wait...
          </Text>
        </View>
      </View>
    </Container>
  ) : (
    <Container>
      <Icon
        name="md-close"
        style={{
          position: "absolute",
          left: 20,
          right: 0,
          top: 20,
          bottom: 0,
          zIndex: 1000,
          width: 30,
          height: 30,
        }}
        onPress={handleCancel}
      />
      <Container style={!showSignature ? { marginTop: 50 } : { marginTop: 30 }}>
        {selectPatient || showSignature ? (
          <React.Fragment>
            {selectPatient && (
              <PatientSelectForm
                setSelectPatient={setSelectPatient}
                setPatient={setPatient}
              />
            )}
            {showSignature && (
              <Signature
                handleSubmit={handleSubmit}
                setShowSignature={setShowSignature}
              />
            )}
          </React.Fragment>
        ) : (
          <ProgressSteps {...progressStepsStyle} activeStep={activeStep}>
            <ProgressStep
              label="Patient Info"
              nextBtnDisabled={firstDisabled}
              onNext={() => setActiveStep(1)}
              scrollViewProps={{ scrollEnabled: false }}
            >
              <View style={{ alignItems: "center" }}>
                {!!patient ? (
                  <PatientRecord
                    patient={patient}
                    setPatient={setPatient}
                    setSelectPatient={setSelectPatient}
                  />
                ) : (
                  <PatientInfoSelect setSelectPatient={setSelectPatient} />
                )}
              </View>
            </ProgressStep>
            <ProgressStep
              label="Record"
              onNext={() => setActiveStep(2)}
              style={styles.topMargin}
              nextBtnDisabled={recordedVideo.uri === null}
              scrollViewProps={{ scrollEnabled: false }}
            >
              {!!recordedVideo.uri ? (
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <Text style={styles.topMargin}>
                    Video was successfully recorded !
                  </Text>
                  <Button onPress={showRecording} style={styles.topMargin}>
                    <Text>Show Recording</Text>
                    <Icon name="eye" />
                  </Button>
                  <Button style={styles.topMargin} onPress={redoRecording}>
                    <Text>Redo Recording</Text>
                    <Icon name="refresh" />
                  </Button>
                </View>
              ) : (
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <Button onPress={_showCamera}>
                    <Text>Start Recording</Text>
                    <Icon name="camera" />
                  </Button>
                </View>
              )}
            </ProgressStep>
            <ProgressStep
              label="Comment"
              onNext={() => setActiveStep(3)}
              style={styles.topMargin}
              scrollViewProps={{ scrollEnabled: false }}
            >
              <View style={{ marginLeft: 20, marginRight: 20, marginTop: 50 }}>
                <Text>
                  Please add comments to further describe the screening
                </Text>
                <View style={{ marginTop: 30 }}>
                  <Textarea
                    rowSpan={5}
                    bordered
                    placeholder="Add comment.."
                    underline={false}
                    onChangeText={(text) => setComment(text)}
                    value={comment}
                  />
                </View>
              </View>
            </ProgressStep>
            <ProgressStep
              label="Review & Submit"
              onSubmit={() => setShowSignature(true)}
            >
              <View style={{ alignItems: "center", flexDirection: "column" }}>
                <View style={styles.topMargin}>
                  <Text>
                    <Text style={styles.bold}>Name:&nbsp;</Text>
                    {patient && patient.full_name}
                  </Text>
                </View>
                <View style={styles.topMargin}>
                  <Text>
                    <Text style={styles.bold}>D.O.B:&nbsp;</Text>
                    {patient && patient.dob}
                  </Text>
                </View>
                <View>
                  <Button onPress={showRecording} style={styles.topMargin}>
                    <Text>Show Recording</Text>
                    <Icon name="eye" />
                  </Button>
                </View>
                <View style={styles.topMargin}>
                  <Text style={styles.bold}>Comment:</Text>
                  <Text>{comment}</Text>
                </View>
              </View>
            </ProgressStep>
          </ProgressSteps>
        )}
        {!!recordedVideo.uri && (
          <Video
            ref={videoRef}
            source={{ uri: recordedVideo.uri }}
            style={{ display: "none" }}
            resizeMode="contain"
          />
        )}
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  topMargin: {
    marginTop: 50,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default RecVideoFlow;
