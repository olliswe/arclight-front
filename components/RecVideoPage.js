import React from 'react';
import {Button, Grid, Row, Text} from "native-base";
import { withNavigation } from 'react-navigation';
import withHeaderFooter from "../higher_order_components/AuthHeaderFooterWrapper";
import {compose} from 'redux'

const RecVideoPage = (props) => {

    return (
        <Grid>
            <Row style={{marginTop:150, justifyContent:'center'}}>
                <Button onPress={()=>props.navigation.navigate('RecVideoFlow')}>
                    <Text> Start Screening </Text>
                </Button>
            </Row>
        </Grid>
    );
};

export default compose(withHeaderFooter, withNavigation)(RecVideoPage);
//
// <Grid>
//     <Row style={{marginTop:20, justifyContent:'center'}}>
//         <Button onPress={props.clearVideo}>
//             <Text> Clear </Text>
//         </Button>
//     </Row>
//     <Row style={{marginTop:150, justifyContent:'center'}}>
//         <Button onPress={props._showCamera} style={{marginBottom:50}}>
//             <Text> Show Camera </Text>
//         </Button>
//     </Row>
//     {!!props.recordedVideo.uri &&
//     <Container>
//         <Row>
//             <Button onPress={props.showRecording}>
//                 <Text> Show Recording </Text>
//             </Button>
//             <Video
//                 ref = {props.videoRef}
//                 source={{ uri: props.recordedVideo.uri }}
//                 style={{display:'none'}}
//                 resizeMode="contain"
//             />
//         </Row>
//         <Row>
//             <Button onPress={props.submitRecording}>
//                 <Text> Submit Recording </Text>
//             </Button>
//         </Row>
//     </Container>
//     }
// </Grid>
