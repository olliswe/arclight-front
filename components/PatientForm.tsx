import React from 'react';
import {Container,  DatePicker, Text, Item, Label, Input } from "native-base";
import {View, Switch, StyleSheet} from 'react-native'
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
                style={styles.center}
            >
            </View>
            <View
                style={styles.row}
            >
                <View
                    style={styles.dob_view}
                >
                    <Text
                    >
                        Date of Birth
                    </Text>
                </View>
                <View
                    style={styles.date_view}
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


const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        justifyContent:'flex-start',
        height:50
    },
    dob_view:{
        width: 100,
        height: 50,
        marginTop:9
    },
    date_view:{
        height: 50
    },
    center:{
        justifyContent: 'center',
        alignItems:'center'
    }
})