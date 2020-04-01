import React, { Component, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon, Left, List, ListItem, Right } from "native-base";

interface Props {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActionModal: React.FC<Props> = ({ modalVisible, setModalVisible }) => {
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
            <ListItem
              key={1}
              button={true}
              onPress={() => null}
              style={styles.listItem}
            >
              <Left>
                <Icon
                  style={{ marginTop: 20, marginRight: 15 }}
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
            <ListItem
              key={2}
              button={true}
              onPress={() => null}
              style={styles.listItem}
            >
              <Left>
                <Icon
                  style={{ marginTop: 20, marginRight: 15 }}
                  name="questioncircle"
                  type="AntDesign"
                />
                <Text>
                  I believe there is a discrepancy in the diagnosis.{"\n"}
                  {"\n"}I would like to submit a message to the physician and
                  keep the case open.
                </Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </TouchableHighlight>
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
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
    width: 350,
  },
  listItem: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default ActionModal;
