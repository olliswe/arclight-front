import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';


const AppFooter = (props) => {

        return (
                <Footer>
                    <FooterTab>
                        <Button>
                            <Icon name="apps" />
                        </Button>
                        <Button active>
                            <Icon name="camera" />
                        </Button>
                        <Button>
                            <Icon name="person" />
                        </Button>
                    </FooterTab>
                </Footer>
        );
    }


export default AppFooter