import React, { useState, useReducer, useEffect } from "react";
// import axios from "axios";
import authReducer, {authInitialState} from "./reducers/authReducer";
import errorReducer, { errorInitialState } from "./reducers/errorReducer";
import { loadUser } from "../flux/actions/authActions";

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
    const [auth, authDispatch] = useReducer(
      authReducer,
      authInitialState
    );
    const [error, errorDispatch] = useReducer(errorReducer, errorInitialState);
    const [state, setState] = useState(intialState);
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
          dispatch: combineDispatchs([authDispatch, errorDispatch])
        }}
      >
        {children}
      </Context.Provider>
    );
}
