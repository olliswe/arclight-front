import React, {useState, useContext} from "react";
import * as Permissions from "expo-permissions";
import MyCam from "../components/MyCam";
import {Video} from "expo-av";
import {  Text, Button, Container, Content, Grid, Row } from 'native-base';
import withHeaderFooter from "../higher_order_components/AuthHeaderFooterWrapper";
import axios from 'axios'
import {UserContext} from "../context/userContext";
import RecVideoPage from "../components/RecVideoPage";


const RecVideo = (props) => {

    const context = useContext(UserContext)
    const token = context.state.token

    const [showCamera, setShowCamera] = useState(false)
    const [recordedVideo, setRecordedVideo] = useState({
        uri:null,
        filename:null
    })
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)


    let videoRef =  React.useRef()


    const clearVideo = () => {
        setShowCamera(false)
        setRecordedVideo({uri:null})
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

    const submitRecording = () => {
        const data = new FormData();

        data.append("file", {
            name: recordedVideo.filename,
            type:"video/mp4",
            uri:recordedVideo.uri
        });

        let headers = {'Authorization':'Token '+token, 'Content-Type':'multipart/form-data'}

        axios.post(process.env.API_URL+'api/upload_video/',data,{headers:headers} )
            .then(res=>{

            })
            .catch(error=>{
                console.log(error)
            })

    }

    return (
            showCamera ? (
                <MyCam setShowCamera={setShowCamera} setRecordedVideo={setRecordedVideo}/>
            ) : (
            <RecVideoPage
            clearVideo={clearVideo}
            _showCamera={_showCamera}
            recordedVideo={recordedVideo}
            showRecording={showRecording}
            videoRef={videoRef}
            submitRecording={submitRecording}
            />
    )
    )
}

export default RecVideo