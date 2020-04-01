import React, { useState, useEffect } from "react";
import { Content, Text } from "native-base";
import SearchField from "./SearchField";
import { useApolloClient } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { View } from "react-native";
import { NavigationFocusInjectedProps } from "react-navigation";
import { VideoUploadData, VideoUploadsQueryObject } from "../../types";
import * as Progress from "react-native-progress";
import { StyleSheet } from "react-native";
import CaseCard from "../CaseCard";

const QUERY_REVIEWED_CASES = gql`
  query my_video_uploads($patient__full_name: String) {
    my_video_uploads(
      screener_status: "reviewed"
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

interface Props extends NavigationFocusInjectedProps {}

const ReviewedTab: React.FC<Props> = (props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [caseData, setCaseData] = useState<VideoUploadData[] | null>(null);
  const client = useApolloClient();

  const getCaseData = () => {
    setLoading(true);
    client
      .query<VideoUploadsQueryObject>({
        query: QUERY_REVIEWED_CASES,
        variables: { patient__full_name: searchTerm },
        fetchPolicy: "network-only",
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

  useEffect(() => {
    props.isFocused && getCaseData();
  }, [props.isFocused]);

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
              lastCommentDate={item.doctor_comments[0].date_added}
              physicianName={item.doctor_comments[0].physician.email}
              patientName={item.patient.full_name}
              recorededDate={item.date_recorded.slice(0, 10)}
            />
          </View>
        ))}
    </Content>
  );
};

export default ReviewedTab;

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
