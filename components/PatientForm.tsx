import React from 'react';
import {Container,  DatePicker, Text, Item, Label, Input } from "native-base";
import {View} from 'react-native'
import {PatientInfo} from "../screens/RecVideoFlow";


type Props = {
    patientInfo:PatientInfo,
    setPatientInfo:(value: PatientInfo | ((prevVar: PatientInfo) => PatientInfo)) => void
}

const PatientForm:React.FC<Props> = (props) => {
    const today = new Date()

    return (
        <Container>
            <View
                style={{flexDirection: 'row', justifyContent:'flex-start', height:50}}
            >
                <View
                    style={{width: 100, height: 50, marginTop:9}}
                >
                    <Text
                    >
                        Date of Birth
                    </Text>
                </View>
                <View
                    style={{ height: 50}}
                >
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
                        onDateChange={(newDate)=>{props.setPatientInfo({...props.patientInfo, dob:newDate})}}
                        disabled={false}
                        placeHolderText={'Select Date'}
                        />
                </View>
            </View>
            <View>
                <Item inlineLabel>
                    <Label>Name</Label>
                    <Input
                    value={props.patientInfo.name}
                    onChangeText={(text)=>{props.setPatientInfo({...props.patientInfo, name:text})}}
                    />
                </Item>
            </View>
        </Container>
    );
};

export default PatientForm;