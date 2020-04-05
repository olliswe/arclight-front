import React from "react";
import { Button, Footer, FooterTab, Icon } from "native-base";

const AppFooter: React.FC = () => {
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
};

export default AppFooter;
