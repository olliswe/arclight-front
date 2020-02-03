import React from 'react';
import {Button, Container, Grid, Row, Text} from "native-base";
import {Video} from "expo-av";
import withHeaderFooter from "../higher_order_components/AuthHeaderFooterWrapper";

const RecVideoPage = (props) => {

    return (
        <Container>
            <Grid>
                <Row style={{marginTop:20, justifyContent:'center'}}>
                    <Button onPress={props.clearVideo}>
                        <Text> Clear </Text>
                    </Button>
                </Row>
                <Row style={{marginTop:150, justifyContent:'center'}}>
                    <Button onPress={props._showCamera} style={{marginBottom:50}}>
                        <Text> Show Camera </Text>
                    </Button>
                </Row>
                {!!props.recordedVideo.uri &&
                <Container>
                    <Row>
                        <Button onPress={props.showRecording}>
                            <Text> Show Recording </Text>
                        </Button>
                        <Video
                            ref = {props.videoRef}
                            source={{ uri: props.recordedVideo.uri }}
                            style={{display:'none'}}
                            resizeMode="contain"
                        />
                    </Row>
                    <Row>
                        <Button onPress={props.submitRecording}>
                            <Text> Submit Recording </Text>
                        </Button>
                    </Row>
                </Container>
                }
            </Grid>
        </Container>
    );
};

export default withHeaderFooter(RecVideoPage);
