import React, { useEffect, useRef, useState, Fragment } from "react";
import {
  Content,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Container,
  Grid,
  Col,
  Text,
  Right,
} from "native-base";
import { withNavigation } from "react-navigation";
import {
  DoctorCommentData,
  ScreenerCommentData,
  StackNavigationProp,
  VideoUploadData,
  VideoUploadQueryObject,
} from "../types";
import PageLoading from "../components/loadingSpinners/PageLoading";
import { useApolloClient } from "@apollo/react-hooks";
import { orderComments } from "../utils";
import { gql } from "apollo-boost";
import { StyleSheet, Modal, View } from "react-native";
import { Video } from "expo-av";
import Comments from "../components/comments";
import Divider from "../components/Divider";
import ActionModal from "../components/diagnosis/ActionModal";
import { BlurView } from "expo-blur";

interface Props extends StackNavigationProp {}

const QUERY_CASE = gql`
  query video_upload($id: String) {
    video_upload(video_upload_id: $id) {
      id
      signed_url
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

const ViewCase: React.FC<Props> = ({ navigation }) => {
  const [record, setRecord] = useState<VideoUploadData | null>(null);
  const [comments, setComments] = useState<
    (DoctorCommentData | ScreenerCommentData)[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const client = useApolloClient();

  let videoRef = useRef<Video>(null);

  const showRecording = () => {
    if (!!videoRef.current) {
      videoRef.current.presentFullscreenPlayer();
    }
  };

  const getCaseData = () => {
    setLoading(true);
    client
      .query<VideoUploadQueryObject>({
        query: QUERY_CASE,
        variables: { id: navigation.getParam("id", "") },
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

  useEffect(() => {
    getCaseData();
  }, []);

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
            <Title>Case ID: {navigation.getParam("id", "")}</Title>
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
                  <Text>{record.screener_status}</Text>
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
              <Button
                onPress={showRecording}
                bordered
                block
                style={styles.blockButton}
              >
                <Text>View video recording</Text>
              </Button>
              <Button
                block
                style={styles.blockButton}
                onPress={() => setModalVisible(true)}
              >
                <Text>Take Action</Text>
              </Button>
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
      <ActionModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Fragment>
  );
};

export default withNavigation(ViewCase);

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
});
