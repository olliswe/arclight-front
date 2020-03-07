import React from 'react';
import {  Footer, FooterTab, Button, Icon } from 'native-base';


const AppFooter:React.FC = () => {

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