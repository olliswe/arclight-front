import React, { useCallback, useState } from "react";
import { Content, Text } from "native-base";
import SearchField from "./SearchField";
import { useApolloClient } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { StyleSheet, View } from "react-native";
import { VideoUploadData, VideoUploadsQueryObject } from "../../types";
import * as Progress from "react-native-progress";
import CaseCard from "../CaseCard";
import { useFocusEffect } from "@react-navigation/native";

const QUERY_ARCHIVED_CASES = gql`
  query my_video_uploads($patient__full_name: String) {
    my_video_uploads(
      screener_status: "archived"
      patient__full_name__icontains: $patient__full_name
    ) {
      id
      signed_url
      date_recorded
      patient {
        full_name
        age
      }
      comment
      doctor_comments {
        comment
        date_added
        physician {
          id
          email
        }
      }
    }
  }
`;

const PendingTab: React.FC<{ counter: number }> = ({ counter }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [caseData, setCaseData] = useState<VideoUploadData[] | null>(null);
  const client = useApolloClient();

  const getCaseData = () => {
    setLoading(true);
    client
      .query<VideoUploadsQueryObject>({
        query: QUERY_ARCHIVED_CASES,
        variables: { patient__full_name: searchTerm },
        fetchPolicy: "no-cache",
      })
      .then((res) => {
        setCaseData(res.data.my_video_uploads);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      getCaseData();
    }, [counter])
  );

  return (
    <Content padder>
      <SearchField
        setSearchTerm={setSearchTerm}
        loading={loading}
        handleSubmit={getCaseData}
      />
      {loading && (
        <View style={styles.progressView}>
          <Progress.Bar indeterminate width={250} />
          <View>
            <Text style={styles.faintText}>
              Fetching updated list of cases...
            </Text>
          </View>
        </View>
      )}
      {!!caseData &&
        caseData.map((item) => (
          <View>
            <CaseCard
              id={item.id}
              lastCommentDate={
                item.doctor_comments.length > 0 &&
                item.doctor_comments[0].date_added
              }
              physicianName={
                item.doctor_comments.length > 0 &&
                item.doctor_comments[0].physician.email
              }
              patientName={item.patient.full_name}
              recorededDate={item.date_recorded.slice(0, 10)}
              loading={loading}
              status="ARCHIVED"
            />
          </View>
        ))}
    </Content>
  );
};

export default PendingTab;

const styles = StyleSheet.create({
  progressView: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: 50,
  },
  faintText: {
    color: "gray",
  },
});
