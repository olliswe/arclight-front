import React, {createContext} from 'react'
import * as SecureStore from 'expo-secure-store';


const UserContext = createContext()


let initialState = {
    user:null,
    token:null,
    isAuthenticated:false,
    loading:true,
};

const storeToken = async (token)=>{
    try{
    await SecureStore.setItemAsync('token',token);
    }catch (error){
        console.log(error)
        console.log('error saving token')
    }
}

let reducer = (state, action) => {

    switch (action.type) {
        case "logout":
            SecureStore.deleteItemAsync('token')
            return {user:null, token:null, isAuthenticated: false, loading:false};
        case "login":
            storeToken(action.payload.token)
            return { user:action.payload.user, token:action.payload.token, isAuthenticated:true, loading:false }
        case "loaded":
            return { ...state, loading:false }

    }
};

const UserContextProvider = (props) => {
    // [A]
    let [state, dispatch] = React.useReducer(reducer, initialState);
    let value = { state, dispatch };


    // [B]
    return (
        <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
    );
}


let UserContextConsumer = UserContext.Consumer;


export { UserContext, UserContextProvider, UserContextConsumer };
