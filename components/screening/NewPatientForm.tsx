import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  DatePicker,
  Input,
  Item,
  Label,
  Text,
} from "@codler/native-base";
import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { PatientData } from "../../types";
import axios from "axios";
import { API_URL } from "../../constants";
import { UserContext, UserContextProps } from "../../context/userContext";

interface PatientInfo {
  full_name: string;
  dob: Date | null;
  gender: string | null;
  telephone_number: string;
}

interface Props {
  setSelectPatient: React.Dispatch<React.SetStateAction<boolean>>;
  setPatient: React.Dispatch<React.SetStateAction<PatientData | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const today = new Date();

const NewPatientForm: React.FC<Props> = (props) => {
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    full_name: "",
    dob: null,
    gender: null,
    telephone_number: "",
  });

  const userContext: UserContextProps = useContext(UserContext);

  const handleSubmit = () => {
    props.setLoading(true);
    let headers = { Authorization: "Token " + userContext.state.token };
    axios
      .post(
        API_URL + "api/patients/",
        {
          ...patientInfo,
          dob: patientInfo.dob?.toISOString().slice(0, 10),
        },
        { headers: headers }
      )
      .then((res) => {
        props.setPatient(res.data);
        props.setLoading(false);
        props.setSelectPatient(false);
      })
      .catch((error) => console.log(error));
  };

  const isDisabled =
    patientInfo.full_name === "" ||
    patientInfo.dob === null ||
    patientInfo.gender === null;

  return (
    <Container style={styles.container}>
      <View style={styles.inputrow}>
        <Item inlineLabel>
          <Label>Full Name</Label>
          <Input
            value={patientInfo.full_name}
            onChangeText={(text) => {
              setPatientInfo({ ...patientInfo, full_name: text });
            }}
            placeholder={"Enter name"}
            placeholderTextColor="lightgray"
          />
        </Item>
      </View>
      <View style={styles.row}>
        <View style={styles.dob_view}>
          <Text>Date of Birth</Text>
        </View>
        <View style={styles.date_view}>
          <DatePicker
            defaultDate={today}
            maximumDate={today}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={(newDate) => {
              setPatientInfo({ ...patientInfo, dob: newDate });
            }}
            disabled={false}
            placeHolderText={"Select Date"}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.dob_view}>
          <Text>Gender</Text>
        </View>
        <View style={styles.picker_view}>
          <RNPickerSelect
            onValueChange={(value) =>
              setPatientInfo({ ...patientInfo, gender: value })
            }
            items={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ]}
            useNativeAndroidPickerStyle={false}
          />
        </View>
      </View>
      <View style={styles.inputrow}>
        <Item inlineLabel>
          <Label>Telephone No.</Label>
          <Input
            value={patientInfo.telephone_number}
            onChangeText={(text) => {
              setPatientInfo({ ...patientInfo, telephone_number: text });
            }}
            placeholder={"Enter number (optional)"}
            placeholderTextColor="lightgray"
          />
        </Item>
      </View>
      <View style={[styles.inputrow, styles.center, styles.container]}>
        <Button
          onPress={handleSubmit}
          disabled={isDisabled}
          style={{ width: "100%", justifyContent: "center" }}
        >
          <Text>Add Patient</Text>
        </Button>
      </View>
    </Container>
  );
};

export default NewPatientForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 45,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginBottom: 10,
    marginLeft: 4,
  },
  dob_view: {
    width: 100,
    height: 50,
    marginTop: 9,
  },
  date_view: {
    height: 50,
  },
  picker_view: {
    marginTop: 10,
    width: 150,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputrow: {
    marginBottom: 20,
  },
});
