import React, { useState, useReducer, useEffect } from "react";

import authReducer, {authInitialState} from "./reducers/authReducer";
import errorReducer, { errorInitialState } from "./reducers/errorReducer";
import likeReducer, { likeInitialState } from "./reducers/likeReducer";

import { loadUser } from "../flux/actions/authActions";
import { getLikes } from "../flux/actions/likeActions";

export const Context = React.createContext();

const combineDispatchs = (dispatchs) => {
  return function(obj) {
    for (let i = 0; i < dispatchs.length; i++) {
      dispatchs[i](obj);
    }
  };
}


export function ContextController({ children }) {
    let intialState = {
        class_list: [],
        heading: "Inital"
    };
    const [state, setState] = useState(intialState);
    const [auth, authDispatch] = useReducer(authReducer, authInitialState);
    const [error, errorDispatch] = useReducer(errorReducer, errorInitialState);
    const [like, likeDispatch] = useReducer(likeReducer, likeInitialState);
    // setState(i=>{i.heading='Start'});
    
    console.log('state', state)
    
    useEffect(() => {
      loadUser(authDispatch, auth);
    }, []);
    

    // useEffect(() => {
        
    // }, []);

    return (
      <Context.Provider
        value={{
          query: [state, setState],
          error: error,
          auth: auth,
          like: like,
          dispatch: combineDispatchs([
            authDispatch,
            errorDispatch,
            likeDispatch
          ])
        }}
      >
        {children}
      </Context.Provider>
    );
}
