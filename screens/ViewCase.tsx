import React, { Fragment, useCallback, useRef, useState } from "react";
import {
  Body,
  Button,
  Col,
  Container,
  Content,
  Grid,
  Header,
  Icon,
  Left,
  Right,
  Spinner,
  Text,
  Title,
} from "@codler/native-base";
import {
  DoctorCommentData,
  ScreenerCommentData,
  VideoUploadData,
  VideoUploadQueryObject,
} from "../types";
import PageLoading from "../components/loadingSpinners/PageLoading";
import { useApolloClient } from "@apollo/react-hooks";
import { orderComments } from "../utils";
import { gql } from "apollo-boost";
import { Image, StyleSheet, View } from "react-native";
import { Video } from "expo-av";
import Comments from "../components/comments";
import Divider from "../components/Divider";
import ActionModal from "../components/diagnosis/ActionModal";
import { BlurView } from "expo-blur";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../navigation/AppNavigation";
import { RouteProp, useFocusEffect } from "@react-navigation/native";

const QUERY_CASE = gql`
  query video_upload($id: String) {
    video_upload(video_upload_id: $id) {
      id
      signed_url
      signed_signature_url
      date_recorded
      patient {
        id
        full_name
        age
        dob
        facility {
          facility_name
          facility_country
        }
      }
      comment
      doctor_status
      screener_status
      doctor_comments {
        comment
        date_added
        physician {
          id
          email
        }
      }
      screener_comments {
        comment
        date_added
        screener {
          email
        }
      }
    }
  }
`;

type ViewCaseScreenNavigationProp = StackNavigationProp<
  AppParamList,
  "ViewCase"
>;

type ViewCaseRouteProp = RouteProp<AppParamList, "ViewCase">;

const getStatusText = (status: "PENDING_REVIEW" | "REVIEWED" | "ARCHIVED") => {
  if (status === "PENDING_REVIEW") return "Pending Review";
  else if (status === "REVIEWED") return "Reviewed, awaiting your action";
  else if (status === "ARCHIVED") return "Archived";
};

const ViewCase: React.FC<{
  navigation: ViewCaseScreenNavigationProp;
  route: ViewCaseRouteProp;
}> = ({ navigation, route }) => {
  const [record, setRecord] = useState<VideoUploadData | null>(null);
  const [comments, setComments] = useState<
    (DoctorCommentData | ScreenerCommentData)[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [videoLoading, setVideoLoading] = useState<boolean>(false);

  const { id } = route.params;

  const client = useApolloClient();

  let videoRef = useRef<Video>(null);

  const showRecording = async () => {
    setVideoLoading(true);
    if (!!videoRef.current) {
      await videoRef.current.presentFullscreenPlayer();
    }
    setVideoLoading(false);
  };

  const getCaseData = () => {
    setLoading(true);
    client
      .query<VideoUploadQueryObject>({
        query: QUERY_CASE,
        variables: { id: id },
        fetchPolicy: "network-only",
      })
      .then((res) => {
        setComments(
          orderComments(
            res.data.video_upload.doctor_comments,
            res.data.video_upload.screener_comments
          )
        );
        setRecord(res.data.video_upload);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useFocusEffect(
    useCallback(() => {
      getCaseData();
    }, [])
  );

  return (
    <Fragment>
      {modalVisible && (
        <View
          style={{
            height: 90,
            zIndex: 999,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <BlurView
            tint={"dark"}
            intensity={100}
            style={{ height: 6000 }}
          ></BlurView>
        </View>
      )}
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Case ID: {id}</Title>
          </Body>
          <Right />
        </Header>
        {loading || !record ? (
          <PageLoading />
        ) : (
          <Content padder>
            <Content style={styles.container}>
              <Grid style={styles.grid}>
                <Col size={6}>
                  <Text style={styles.boldText}>Status:</Text>
                </Col>
                <Col size={6}>
                  <Text>{getStatusText(record.screener_status)}</Text>
                </Col>
              </Grid>
              <Grid style={styles.grid}>
                <Col size={6}>
                  <Text style={styles.boldText}>Patient ID:</Text>
                </Col>
                <Col size={6}>
                  <Text>{record.patient.id}</Text>
                </Col>
              </Grid>
              <Grid style={styles.grid}>
                <Col size={6}>
                  <Text style={styles.boldText}>Patient Name:</Text>
                </Col>
                <Col size={6}>
                  <Text>{record.patient.full_name}</Text>
                </Col>
              </Grid>
              <Grid style={styles.grid}>
                <Col size={6}>
                  <Text style={styles.boldText}>Patient D.O.B.:</Text>
                </Col>
                <Col size={6}>
                  <Text>{record.patient.dob}</Text>
                </Col>
              </Grid>
              <Grid style={styles.grid}>
                <Col size={6}>
                  <Text style={styles.boldText}>Screening Date:</Text>
                </Col>
                <Col size={6}>
                  <Text>{record.date_recorded.slice(0, 10)}</Text>
                </Col>
              </Grid>
              <Grid style={styles.grid}>
                <Col size={6}>
                  <Text style={styles.boldText}>Initial Comment:</Text>
                </Col>
                <Col size={6}>
                  <Text>{record.comment}</Text>
                </Col>
              </Grid>
              <Grid style={styles.grid}>
                <Col size={6}>
                  <Text style={styles.boldText}>Signature:</Text>
                </Col>
                <Col size={6}>
                  <Image
                    source={{ uri: record.signed_signature_url }}
                    style={{ height: 40, resizeMode: "contain" }}
                  />
                </Col>
              </Grid>
              <Button
                onPress={showRecording}
                bordered
                block
                style={styles.blockButton}
              >
                {videoLoading ? (
                  <React.Fragment>
                    <Text>Fetching video...</Text>
                    <Spinner size="small" />
                  </React.Fragment>
                ) : (
                  <Text>View video recording</Text>
                )}
              </Button>
              <Button
                block
                style={styles.blockButton}
                onPress={() => setModalVisible(true)}
                disabled={record.screener_status === "PENDING_REVIEW"}
              >
                <Text>Take Action</Text>
              </Button>
              {record.screener_status === "PENDING_REVIEW" && (
                <Text style={styles.helpText}>
                  You cannot perform an action while the case is pending
                  review...
                </Text>
              )}
            </Content>
            <Video
              ref={videoRef}
              source={{ uri: record.signed_url }}
              style={{ display: "none" }}
              resizeMode="contain"
            />
            <Divider style={styles.divider} />
            <Comments comments={comments} />
          </Content>
        )}
      </Container>
      {record && (
        <ActionModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          caseId={id}
          setLoading={setLoading}
          setRecord={setRecord}
          status={record.screener_status}
        />
      )}
    </Fragment>
  );
};

export default ViewCase;

const styles = StyleSheet.create({
  boldText: {
    fontWeight: "bold",
  },
  container: {
    marginTop: 20,
  },
  grid: {
    margin: 10,
  },
  divider: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },
  blockButton: {
    marginTop: 20,
  },
  helpText: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 3,
  },
});
