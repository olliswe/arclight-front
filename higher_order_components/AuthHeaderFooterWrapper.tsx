import React from "react";
import { Container } from "@codler/native-base";
import AppHeader from "../components/Header";

// (WrapperComponent:React.FC) => React.FC<NavProps>

const withHeader = (WrappedComponent: React.FC<any>) => {
  return function (props: any) {
    return (
      <Container>
        <AppHeader />
        <WrappedComponent {...props} />
      </Container>
    );
  };
};

export default withHeader;
