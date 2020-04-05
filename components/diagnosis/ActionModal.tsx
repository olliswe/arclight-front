import React, { useContext } from "react";
import { Alert, Dimensions, Modal, StyleSheet, View } from "react-native";
import { Button, Icon, Left, List, ListItem, Right, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { AddCommentScreenNavigationProp } from "../../screens/AddComment";
import { UserContext, UserContextProps } from "../../context/userContext";
import axios from "axios";
import { API_URL } from "../../constants";
import { VideoUploadData } from "../../types";

interface Props {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  caseId: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setRecord: React.Dispatch<React.SetStateAction<VideoUploadData | null>>;
  status: "PENDING_REVIEW" | "REVIEWED" | "ARCHIVED";
}

const screenWidth = Math.round(Dimensions.get("window").width);

const ActionModal: React.FC<Props> = ({
  modalVisible,
  setModalVisible,
  caseId,
  setLoading,
  setRecord,
  status,
}) => {
  const navigation = useNavigation<AddCommentScreenNavigationProp>();
  let userContext: UserContextProps = useContext(UserContext);

  const handleArchive = () => {
    setModalVisible(false);
    setLoading(true);
    let headers = { Authorization: "Token " + userContext.state.token };
    axios
      .patch(
        API_URL + "api/archive_video/" + caseId + "/",
        {},
        {
          headers: headers,
        }
      )
      .then((res) => {
        setRecord(
          (record) => record && { ...record, screener_status: "ARCHIVED" }
        );
        setLoading(false);
      });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <List style={styles.list}>
            {status === "REVIEWED" && (
              <ListItem
                key={1}
                button={true}
                onPress={handleArchive}
                style={styles.listItem}
              >
                <Left>
                  <Icon
                    style={{ marginTop: 20, marginRight: 15, color: "green" }}
                    name="checkcircle"
                    type="AntDesign"
                  />
                  <Text>
                    I have reported the diagnosis to the patient, and I am
                    satisfied with the result.{"\n"}
                    {"\n"}The case can be archived
                  </Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            )}
            <ListItem
              key={2}
              button={true}
              onPress={() => {
                setModalVisible(!modalVisible);
                setTimeout(
                  () => navigation.navigate("AddComment", { id: caseId }),
                  500
                );
              }}
              style={styles.listItem}
            >
              <Left>
                <Icon
                  style={{ marginTop: 20, marginRight: 15, color: "orange" }}
                  name="questioncircle"
                  type="AntDesign"
                />
                <Text>
                  I believe there is a discrepancy in the diagnosis.{"\n"}
                  {"\n"}I would like to submit a message to the physician and
                  {status === "ARCHIVED"
                    ? " reopen the case"
                    : " keep the case open"}
                  .
                </Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>

          <Button
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            bordered
            warning
            block
          >
            <Text>Cancel</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 50,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexWrap: "wrap",
    padding: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  list: {
    width: screenWidth - 50,
  },
  listItem: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default ActionModal;
