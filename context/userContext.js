import React, {createContext} from 'react'


const UserContext = createContext()


let initialState = {
    user:null,
    token:null,
    isAuthenticated:false
};

let reducer = (state, action) => {

    switch (action.type) {
        case "logout":
            // Storage.remove({key:'user'})
            // Storage.remove({key:'token'})
            return initialState;
        case "login":
            // Storage.set({key: 'user',value:
            //         JSON.stringify({
            //             id: action.payload.user.id,
            //             email: action.payload.user.email,
            //             first_name:action.payload.user.first_name,
            //             last_name:action.payload.user.last_name,
            //             full_name:action.payload.user.full_name
            //         }).toString()
            //
            // });
            // Storage.set({key: 'token',value: action.payload.token});
            return { user:action.payload.user, token:action.payload.token, isAuthenticated:true };
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
