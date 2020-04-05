import React from "react";
import { UserContextProvider } from "../context/userContext";

const withUserContext = (WrappedComponent: React.FC) => {
  return function (props: object) {
    return (
      <UserContextProvider>
        <WrappedComponent {...props} />
      </UserContextProvider>
    );
  };
};

export default withUserContext;
