import React, {useEffect, useState} from "react";
import * as MediaLibrary from 'expo-media-library';
import {Camera} from "expo-camera";
import { TouchableOpacity, StyleSheet, Platform} from "react-native";
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions'
import {Container, Text} from "native-base";
import {Ionicons} from '@expo/vector-icons'

const offSet = 150

const MyCam = (props) => {

    const [picture, setPicture] = useState(null)
    const [recording, setRecording] = useState(null)
    const [hasPermission, setHasPermission] = useState(null);
    const [focus, setFocus] = useState(0.5)
    const [zoom, setZoom] = useState(0)
    const [cameraNotReady, setCameraNotReady] = useState(false)

    let cam = React.useRef()


    useEffect(() => {
        (async () => {
            const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING, Permissions.CAMERA);
            setHasPermission(status === 'granted');
        })();
    }, []);

    const getOptions = () => Platform.OS === 'android' ? {quality:Camera.Constants.VideoQuality['4:3']} : {}



    const recordVideo = async() => {
        console.log('hello from RecordVideo')
        const videoRecording = await cam.current.recordAsync({...getOptions()})

        return videoRecording
    }

    useEffect(()=>{
        if (recording) {
            recordVideo()
                .then(res=>{
                    console.log('callback from stopped recording')
                    saveVideo(res)
                        .then(
                            res=>props.setShowCamera(false)
                        )
                    }
                )
                .catch(error=>console.log(error))
        }
        else if (recording === false){
            cam.current.stopRecording()
        }
    }, [recording]);


    const saveVideo = async (video) => {
        const asset = await MediaLibrary.createAssetAsync(video.uri);
        const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);
        if (asset) {
            props.setRecordedVideo({uri:assetInfo.localUri, filename:asset.filename})
            console.log('video saved!')
        }
        return ('Video Saved')
    };


    const stopRecord = () => {
        setRecording(false)
    };

    const startRecord = () => {
        if (cam){
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

    const increaseFocus = () => {
        if (Platform.OS ==='android') {
            setCameraNotReady(true)
        }
        if (focus < 1) {
            setFocus(focus => focus + 0.05)
        }
    }

    const decreaseFocus = () => {
        if (Platform.OS==='android') {
            setCameraNotReady(true)
        }
        if (focus > 0) {
            setFocus(focus => focus - 0.05)
        }
    }

    const increaseZoom = () => {
        if (Platform.OS ==='android') {
            setCameraNotReady(true)
        }
        if (zoom < 1) {
            setZoom(zoom => zoom + 0.05)
        }
    }

    const decreaseZoom = () => {
        if (Platform.OS==='android') {
            setCameraNotReady(true)
        }
        if (zoom > 0) {
            setZoom(zoom => zoom - 0.05)
        }
    }




    if (hasPermission === null) {
        return <Container />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    return (
        <Camera
            style={{
                flex:1,
                width: "100%",
                ratio:"16:9",
            }}
            ref={cam}
            focusDepth={focus}
            zoom={zoom}
            useCamera2Api={true}
            autoFocus={Camera.Constants.AutoFocus.off}
            onCameraReady={()=>setCameraNotReady(false)}
        >

            <Text
                style={{
                    ...styles.zoomItem,
                    top:offSet,
                }}>
                Zoom
            </Text>
            <TouchableOpacity
                onPress={increaseZoom}
                style={{
                    ...styles.zoomItem,
                    top:offSet+40
                }}
                disabled={cameraNotReady || zoom>0.95}
            >
                <Ionicons
                    name={'md-add'} size={40} color={'white'}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={decreaseZoom}
                style={{
                    ...styles.zoomItem,
                    top:offSet+120,
                }}
                disabled={cameraNotReady || zoom<0.05}
            >
                <Ionicons
                    name={'md-remove'} size={40} color={'white'}
                />
            </TouchableOpacity>
            <Text
                style={{
                    ...styles.zoomItem,
                    top:offSet+200,

                }}>
                {Math.round(zoom*100)} %
            </Text>
            <Text
                style={{
                    ...styles.focusItem,
                    top:offSet,
                }}>
                Focus
            </Text>
            <TouchableOpacity
                onPress={increaseFocus}
                style={{
                    ...styles.focusItem,
                    top:offSet+40
                }}
                disabled={cameraNotReady || focus>0.95}
            >
                <Ionicons
                    name={'md-add'} size={40} color={'white'}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={decreaseFocus}
                style={{
                    ...styles.focusItem,
                    top:offSet+120,
                }}
                disabled={cameraNotReady || focus<0.05}
            >
                <Ionicons
                    name={'md-remove'} size={40} color={'white'}
                />
            </TouchableOpacity>
            <Text
                style={{
                    ...styles.focusItem,
                    top:offSet+200,

                }}>
                {Math.round(focus*100)} %
            </Text>
        <TouchableOpacity
            onPress={toggleRecord}
            style={{
                padding: 20,
                width: "100%",
                backgroundColor: recording ? "#ef4f84" : "#4fef97",
                position:'absolute',
                bottom:10
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

const styles = StyleSheet.create({
    focusItem:{
        position:'absolute',
        right:30,
        backgroundColor:"rgba(0,0,0,0.5)",
        color:'white',
        padding:3
    },
    zoomItem:{
        position:'absolute',
        left:30,
        backgroundColor:"rgba(0,0,0,0.5)",
        color:'white',
        padding:3
    }
})