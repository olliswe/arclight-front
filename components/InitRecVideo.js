import React from 'react';
import {Button, Container, Grid, Row, Text} from 'native-base'

const InitRecVideo = (props) => {
    return (
        <Container>
            <Grid>
                <Row style={{marginTop:150, justifyContent:'center'}}>
                    <Button>
                        <Text> Start Screening </Text>
                    </Button>
                </Row>
            </Grid>
        </Container>
    );
};

export default InitRecVideo;
