import React from 'react';
import {UserContextProvider} from "../context/userContext";

const withUserContext =  (WrappedComponent) => {
    return (
        function(props){
            return(
            <UserContextProvider><WrappedComponent {...props}/></UserContextProvider>
            )
        }
    );
};

export default withUserContext
