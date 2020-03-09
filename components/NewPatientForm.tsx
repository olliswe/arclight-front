import React, {useState} from 'react';
import {Container,  DatePicker, Text, Item, Label, Input } from "native-base";
import {View, StyleSheet} from 'react-native'
import RNPickerSelect from 'react-native-picker-select';


interface PatientInfo {
    full_name:string,
    dob:Date|null,
    gender:string | null,
    telephone_number:string
}



const NewPatientForm:React.FC = () => {

    const [patientInfo, setPatientInfo] = useState<PatientInfo>({
        full_name:'',
        dob:null,
        gender:null,
        telephone_number:''
    })


    const today = new Date()

    return (
        <Container style={styles.container}>
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
                        onDateChange={(newDate)=>{setPatientInfo({...patientInfo, dob:newDate})}}
                        disabled={false}
                        placeHolderText={'Select Date'}
                    />
                </View>
            </View>
            <View style={styles.inputrow}>
                <Item inlineLabel>
                    <Label>Full Name</Label>
                    <Input
                        value={patientInfo.full_name}
                        onChangeText={(text)=>{setPatientInfo({...patientInfo, full_name:text})}}
                        placeholder={'Enter name'}
                    />
                </Item>
            </View>
            <View
                style={styles.row}
            >
                <View
                    style={styles.dob_view}
                >
                    <Text
                    >
                        Gender
                    </Text>
                </View>
                <View
                    style={styles.picker_view}
                >
                    <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
                        items={[
                            { label: 'Male', value: 'Male' },
                            { label: 'Female', value: 'Female' },
                        ]}
                    />
                </View>
            </View>
            <View style={styles.inputrow}>
                <Item inlineLabel>
                    <Label>Telephone Number</Label>
                    <Input
                        value={patientInfo.telephone_number}
                        onChangeText={(text)=>{setPatientInfo({...patientInfo, telephone_number:text})}}
                        placeholder={'Enter number'}
                    />
                </Item>
            </View>
        </Container>
    );
};

export default NewPatientForm;


const styles = StyleSheet.create({
    container:{
        marginTop:20
    },
    row:{
        flexDirection: 'row',
        justifyContent:'flex-start',
        height:45,
        borderBottomColor:'lightgray',
        borderBottomWidth:1,
        marginBottom:10,
        marginLeft:4
    },
    dob_view:{
        width: 100,
        height: 50,
        marginTop:9
    },
    date_view:{
        height: 50
    },
    picker_view:{
        marginTop:10
    },
    center:{
        justifyContent: 'center',
        alignItems:'center'
    },
    inputrow:{
        marginBottom:20
    }
})