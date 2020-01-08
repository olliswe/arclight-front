import React, {useState, Fragment} from "react";
import * as Permissions from "expo-permissions";
import { TouchableOpacity, View} from "react-native";
import MyCam from "../components/MyCam";
import {Video} from "expo-av";
import {  Text, Button, Container, Content, Grid, Row } from 'native-base';
import AppHeader from "../components/Header";



const RecVideo = (props) => {
    const [showCamera, setShowCamera] = useState(false)
    const [recordedVideo, setRecordedVideo] = useState({
        uri:null
    })

    let videoRef =  React.useRef()


    const _showCamera = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status === "granted") {
            setShowCamera(true)
        }
    }

    const showRecording = () => {
        videoRef.current.presentFullscreenPlayer()
    }

    return (
            showCamera ? (
                <MyCam setShowCamera={setShowCamera} setRecordedVideo={setRecordedVideo}/>
            ) : (
            <Container>
                <Grid>
                    <Row style={{marginTop:150, justifyContent:'center'}}>
                        <Button onPress={_showCamera} style={{marginBottom:50}}>
                            <Text> Show Camera </Text>
                        </Button>
                    </Row>
                    {!!recordedVideo.uri &&
                    <Row>
                        <Button onPress={showRecording}>
                            <Text> Show Recording </Text>
                        </Button>
                        <Video
                            ref = {videoRef}
                            source={{ uri: recordedVideo.uri }}
                            style={{display:'none'}}
                            resizeMode="contain"
                        />
                    </Row>
                    }
                </Grid>
            </Container>
    )
    )
}

export default RecVideo