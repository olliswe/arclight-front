import React, {useEffect, useState} from "react";
import * as MediaLibrary from 'expo-media-library';
import {Camera} from "expo-camera";
import { TouchableOpacity} from "react-native";
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions'
import {Container, Text} from "native-base";

const MyCam = (props) => {

    const [picture, setPicture] = useState(null)
    const [recording, setRecording] = useState(null)
    const [hasPermission, setHasPermission] = useState(null);

    let cam = React.useRef()

    useEffect(() => {
        (async () => {
            const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING, Permissions.CAMERA);
            setHasPermission(status === 'granted');
        })();
    }, []);



    const recordVideo = async() => {
        console.log('hello from RecordVideo')
        const videoRecording = await cam.current.recordAsync(
            {quality:Camera.Constants.VideoQuality['4:3']}
        );
        return videoRecording
    }

    useEffect(()=>{
        if (recording) {
            recordVideo()
                .then(res=>{
                    console.log('callback from stopped recording')
                    saveVideo(res)
                    }
                )
        }
        else if (recording === false){
            cam.current.stopRecording()
            props.setShowCamera(false)
        }
    }, [recording]);


    const saveVideo = async (video) => {
        const asset = await MediaLibrary.createAssetAsync(video.uri);
        console.log('hello from save Video')
        console.log(asset)
        if (asset) {
            props.setRecordedVideo({uri:asset.uri, filename:asset.filename})
            console.log('video saved!')
        }
    };


    const stopRecord = () => {
        console.log('stopped recordg')
        setRecording(false)
    };

    const startRecord = () => {
        if (cam){
            console.log('recording!')
            setRecording(true)
            }
    }


    const toggleRecord = () => {
        if (recording) {
            stopRecord();
        } else {
            startRecord();
        }
    };

    if (hasPermission === null) {
        return <Container />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    return (
        <Camera
            style={{
                justifyContent: "flex-end",
                flex:1,
                alignItems:'center',
                width: "100%",
                ratio:"16:9",
            }}
            ref={cam}
        >
        <TouchableOpacity
            onPress={toggleRecord}
            style={{
                padding: 20,
                width: "100%",
                backgroundColor: recording ? "#ef4f84" : "#4fef97"
            }}
        >
            <Text style={{ textAlign: "center" }}>
                {recording ? "Stop" : "Record"}
            </Text>
        </TouchableOpacity>
        </Camera>
    )
}

export default MyCam