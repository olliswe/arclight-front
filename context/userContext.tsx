import React, {createContext, Dispatch} from 'react'
import * as SecureStore from 'expo-secure-store';
import {User} from "../types";


const UserContext = createContext<UserContextProps>({} as UserContextProps)


type UserContextState = {
    user:User|null,
    token:string|null,
    isAuthenticated:boolean,
    loading:boolean
}

type UserContextAction =
    | { type: 'logout' }
    | { type: 'login', payload:{user:User, token:string}}
    | { type: 'loaded'};

type UserContextProps = {state:UserContextState,dispatch:Dispatch<UserContextAction>}


let initialState:UserContextState = {
    user:null,
    token:null,
    isAuthenticated:false,
    loading:true,
};

const storeToken = async (token:string)=>{
    try{
        await SecureStore.setItemAsync('token',token);
    }catch (error){
        console.log(error)
        console.log('error saving token')
    }
}

let reducer = (state:UserContextState, action:UserContextAction) => {

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



const UserContextProvider:React.FC = (props) => {
    // [A]
    let [state, dispatch] = React.useReducer(reducer, initialState);
    let value = { state, dispatch };


    // [B]
    return (
        <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
    );
}


let UserContextConsumer = UserContext.Consumer;


export { UserContext, UserContextProvider, UserContextConsumer, UserContextState, UserContextAction, UserContextProps };
