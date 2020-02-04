import React, {useState, useRef, useContext} from 'react';
import {Container, Text, Icon, Button, Spinner} from "native-base";
import {ProgressStep, ProgressSteps} from "react-native-progress-steps";
import {View, Alert, StyleSheet} from "react-native";
import {withNavigation} from "react-navigation";
import PatientForm from "../components/PatientForm";
import * as Permissions from "expo-permissions";
import MyCam from "../components/MyCam";
import {Video} from "expo-av";
import axios from "axios";
import {UserContext} from "../context/userContext";


const RecVideoFlow = (props) => {
    const context = useContext(UserContext)
    const token = context.state.token



    const [patientInfo, setPatientInfo] = useState({
        name:'',
        dob:null
    })
    const [activeStep, setActiveStep] = useState(0)

    const [showCamera, setShowCamera] = useState(false)
    const [recordedVideo, setRecordedVideo] = useState({
        uri:null,
        filename:null
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    let videoRef =  useRef()

    const firstDisabled = patientInfo.name === '' || patientInfo.dob === null


    const progressStepsStyle = {
        activeStepIconBorderColor: '#334393',
        activeLabelColor: '#334393',
        activeStepNumColor: 'white',
        activeStepIconColor: '#334393',
        completedStepIconColor: '#334393',
        completedProgressBarColor: '#334393',
        completedCheckColor: 'white'
    };

    const handleCancel = () => {
        Alert.alert(
            'You are about to abort the screening!',
            'Are you sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => props.navigation.navigate('Home')},
            ],
            {cancelable: true},
        );
    }

    const _showCamera = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status === "granted") {
            setShowCamera(true)
        }
    }

    const showRecording = () => {
        videoRef.current.presentFullscreenPlayer()
    }

    const redoRecording = () => {
        setRecordedVideo({
            uri:null,
            filename:null
        })
        _showCamera()
    }

    const handleSubmit = () => {
        setLoading(true)
        const data = new FormData();
        data.append("file", {
            name: recordedVideo.filename,
            type:"video/mp4",
            uri:recordedVideo.uri
        });
        data.append("name", patientInfo.name)
        data.append("dob", patientInfo.dob.toISOString())

        let headers = {'Authorization':'Token '+token, 'Content-Type':'multipart/form-data'}

        axios.post(process.env.API_URL+'api/upload_video/',data,{headers:headers} )
            .then(res=>{
                setLoading(false)
                setSuccess(true)
            })
            .catch(error=>{
                console.log(error)
                setLoading(false)
                setSuccess(false)
                setError(true)
            })
    }





    return (
        showCamera ? (
                <MyCam setShowCamera={setShowCamera} setRecordedVideo={setRecordedVideo}/>
            )
            :(
    success ?
    <Container>
        <Container>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <View
                    style={{
                        flexDirection:'column',
                        justifyContent:'center'
                    }}
                >
                    <Text>
                        Success!
                    </Text>
                    <Button style={styles.topMargin}
                            onPress={()=>props.navigation.navigate('Home')}
                    >
                        <Text>Close
                        </Text>
                    </Button>
                </View>
            </View>
        </Container>
    </Container>
    :
        (
      loading ?
      <Container>
        <View
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
            <View
            style={{
                flexDirection:'column',
                justifyContent:'center'
            }}
            >
                <Spinner />
                <Text style={styles.topMargin}>
                    Uploading the video, please wait...
                </Text>
            </View>
        </View>
      </Container>
      :
    <Container>
        <Icon name="md-close" style={{
            position: 'absolute',
            left: 10,
            right: 0,
            top: 5,
            bottom: 0
        }}
              onPress={handleCancel}
        />
        <Container style={{marginTop: 50}}>
            <ProgressSteps
                {...progressStepsStyle}
                activeStep = {activeStep}
            >
                <ProgressStep label="Patient Info"
                              nextBtnDisabled={firstDisabled}
                              onNext={()=>{setActiveStep(activeStep=>activeStep+1)}}
                >
                    <View style={{alignItems: 'center'}}>
                        <PatientForm
                            patientInfo={patientInfo}
                            setPatientInfo={setPatientInfo}
                        />
                    </View>
                </ProgressStep>
                <ProgressStep
                    label="Record"
                    onNext={()=>{setActiveStep(activeStep=>activeStep+1)}}
                    style={styles.topMargin}
                    nextBtnDisabled={recordedVideo.uri===null}
                >
                    {!!recordedVideo.uri ?
                        <View style={{flexDirection:'column', alignItems: 'center', }}>
                            <Text style={styles.topMargin}>
                                Video was successfully recorded !
                            </Text>
                            <Button onPress={showRecording} style={styles.topMargin}>
                                <Text>Show Recording
                                </Text>
                                <Icon
                                    name="eye"
                                />
                            </Button>
                            <Button style={styles.topMargin} onPress={redoRecording}>
                                <Text>Redo Recording
                                </Text>
                                <Icon
                                    name="refresh"
                                />
                            </Button>
                        </View>
                        :
                        <View style={{alignItems: 'center'}}>
                            <Button onPress={_showCamera}>
                                <Text>Start Recording
                                </Text>
                                <Icon
                                    name="camera"
                                />
                            </Button>
                        </View>
                    }
                </ProgressStep>
                <ProgressStep
                    label="Review & Submit"
                    onSubmit = {handleSubmit}
                >
                    <View style={{alignItems: 'center', flexDirection:'column'}}>
                        <View style={styles.topMargin}>
                            <Text>
                                <Text style={styles.bold}>
                                    Name:&nbsp;
                                </Text>
                                {patientInfo.name}
                            </Text>
                        </View>
                        <View style={styles.topMargin}>
                            <Text>
                                <Text style={styles.bold}>
                                    D.O.B:&nbsp;
                                </Text>
                                {patientInfo.dob && patientInfo.dob.toString().substr(4, 12)}
                            </Text>
                        </View>
                        <View>
                            <Button onPress={showRecording} style={styles.topMargin}>
                                <Text>Show Recording
                                </Text>
                                <Icon
                                    name="eye"
                                />
                            </Button>
                        </View>
                    </View>
                </ProgressStep>
            </ProgressSteps>
            <Video
                ref = {videoRef}
                source={{ uri: recordedVideo.uri }}
                style={{display:'none'}}
                resizeMode="contain"
            />
        </Container>
    </Container>
            ))
    );

};


const styles = StyleSheet.create({
  topMargin:{
      marginTop:50
  },
  bold:{
      fontWeight:'bold'
  }
});


export default withNavigation(RecVideoFlow);
